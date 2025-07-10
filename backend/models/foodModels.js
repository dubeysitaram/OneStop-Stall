import mongoose from "mongoose";


// Mongoose is and ODM 
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. 
// It provides a structured way to interact with MongoDB by defining schemas, enforcing data validation,
//  and offering built-in query methods.
const foodSchema=new mongoose.Schema({
    name:{
type:String,
required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})
// what happens is that when we start our server agian the mdoel is created again to prevent that , 
// we use this or condition so that if wwe already have that model than we dont need to create it again using  mongoose.model("food",foodSchema)
const foodModel=mongoose.models.food || mongoose.model("food",foodSchema);
export default foodModel;