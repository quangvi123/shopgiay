// src/services/productService.js

const { Product } = require("../models");

const getAllProduct = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const createProduct = async (data) => {
    try {
        const product = await Product.create(data);
        console.log('data product service', product);
        
        return product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const updateProduct = async ({ data, id }) => {
    try {
        console.log("log product new ", data);
        
        const result = await Product.update({ ...data }, { where: { id: Number(id) } });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    console.log('id service', id);
    
    try {
        await Product.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Hàm chi tiết sản phẩm
const getProductDetail = async (id) => {
    try {
        const product = await Product.findOne({ where: { id: Number(id) } });
        console.log('product758485848484848484848484',product);
        

        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }

        return product;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetail,  // Export hàm chi tiết sản phẩm
};
