import foodModel from "../models/foodModels.js";
import fs from 'fs'

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(e)
    {
        console.log(e);
        res.json({success:false,
            message:"Error while saving food"
        })
    }
}


export const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(e)
    {
        console.log(e);
        res.json({success:false,message:"Error while fetching"})
    }
}
const removeFood=async(req,res)=>
{
    try{
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food Removed"})
    }catch(e)
    {
        console.log(e);
        res.json({success:false,message:"Error in deleting"})
    }
}
export {addFood,removeFood}