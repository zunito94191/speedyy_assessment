const Products = require('../models/products');

const createProduct = async(req,res,next) =>{
    try{
    const product  = await Products.create({...req.body,isPublished:false},{fields:["isPublished","mrp","name","price","stock"]});
    res.status(201).json({
        ...product.dataValues
    })

    }catch(err){
        res.status(400).json({
            status:"fail"
        })
    }
}

const getProducts = async(req,res,next)=>{
    try{
        const products = await Products.findAll({},{order:['id']});
        res.status(200).json([
            ...products
        ])
    }
    catch(err){
        res.status(400).json({
            status:"fail"
        });
    }
}
const deleteProducts = async(req,res,next)=>{
    try{
        res.status(405).json({
            message:"fail"
        })
    }
    catch(err){
        res.status(405).json({
            message:"fail"
        })
    }
}
const patchProduct  =async(req,res,next)=>{
    try{
        const product = await Products.findByPk(req.params.id);
        if(product.dataValues.mrp<product.dataValues.price && product.dataValues.stock<=0){
            return res.status(422).json(["MRP should be less than equal to the Price","Stock count is 0"])
        }
        if(product.dataValues.mrp<product.dataValues.price){
            return res.status(422).json([
               "MRP should be less than equal to the Price"
            ]);
        }else if(product.dataValues.stock<=0){
            return res.status(422).json([
               "Stock count is 0"
            ]);
        }
        product.update({isPublished:true});
        return res.status(204).json();
        
    }catch(err){
        res.status(405).json({
            message:"fail"
        })
    }
    

}

module.exports = {createProduct,getProducts,deleteProducts,patchProduct} 