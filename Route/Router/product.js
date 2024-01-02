const productModel = require("../../Models/productModels");



const getAllProducts = async (req, res) => {
    try {
        const product = await productModel.find();
        res.status(200).json(product);
    } catch (e) {
        console.log(e);
    }
};

module.exports = getAllProducts;



