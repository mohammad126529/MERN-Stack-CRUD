import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async(req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json({success:true , data:product});

    } catch (error) {
        console.log("error in fetching product:",error.massage);
        res.status(500).json({success:false,massage:"Server error"});

    }
};


export const createProducts = async(req,res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image)
       { return res.status(400).json({success:false,massage:"Please provide all fields"});}

        const newProduct = new Product(product)

        try {
            await newProduct.save();
            res.status(201).json({success:true , data:newProduct});
        } catch (error) {
            console.log("Error in Ceate Product:",error.massage);
            res.status(500).json({success:false,massage:"Server error"});
        }
    
    };

    export const updateProducts = async(req,res)=>{
        const {id} = req.params
        const product = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false,massage:"Invalid Product Id"});
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
            res.status(200).json({success:true , data:updatedProduct});
        } catch (error) {
            console.log("Error in UpdateProduct:",error.massage);
            res.status(500).json({success:false,massage:"Server not found"});
        }
};


export const deleteProducts = async(req,res)=>{
    const {id} = req.params
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true , message:"Product deleted"});
    } catch (error) {
        console.log("Error in deleting product:",error.massage);
        res.status(404).json({success:false,massage:"Product not found"});
    }
};