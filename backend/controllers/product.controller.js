import mongoose from 'mongoose';
import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({success: true, data: products});
    } catch (error) {
      res.status(500).json({success: false, message: 'Server Error'});
      console.error("get products failed!", error.message);
    }
  };

export const createProduct = async (req, res) => {
    const product = req.body;
  
    if(!product.name || !product.price || !product.image) {
      return res.status(400).json({succes: false, message: 'Please fill all the fields'});
    }
    
    const newProduct = new Product(product)
    
    try {
      await newProduct.save();
      res.status(201).json({success: true, data: newProduct});
    } catch (error) {
      console.error("create product failed!", error.message);
      res.status(500).json({success: false, message: 'Server Error'});
    }
  };

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({success: false, message: 'Product not found'});
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
      res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
      console.error("update product failed!", error.message);
      res.status(500).json({success: false, message: 'Server Error'});
    }
  };

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({success: false, message: 'Product not found'});
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message: 'Product has been deleted'});
    } catch (error) {
      console.error("delete product failed!", error.message);
      res.status(500).json({success: false, message: 'server error'});
    }
  };