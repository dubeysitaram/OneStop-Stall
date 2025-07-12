import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState({});
  const url = "https://onestop-stall.onrender.com";
  const [token, setToken] = useState("");
  const[food_list,setFoodList]=useState([]);

const addToCart = async (itemId) => {
  setCartItems((prev) => {
    const newCart = { ...prev };
    newCart[itemId] = (newCart[itemId] || 0) + 1;
    return newCart;
  });

  if (token) {
    try {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
};

  
const removeFromCart = async (itemId) => {
  setCartItems((prev) => {
    const newCart = { ...prev };
    if (newCart[itemId] > 1) {
      newCart[itemId] -= 1;
    } else {
      delete newCart[itemId]; // Cleanly remove item if count is 1 or less
    }
    return newCart;
  });

  if (token) {
    try {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }
};

  // for in loop  because cartitems are in form of objects and this will provide cart items one by one in form of 
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);// product will act as index inside food_list 
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList=async ()=>{
    const response=await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) => {
    
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }
  
useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData(storedToken);
    }
    setLoading(false);
  }
  loadData();
}, []);


const contextValue = {
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  url,
  token,
  setToken,
  loading
};

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
