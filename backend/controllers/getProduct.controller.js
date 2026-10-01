const Product = require('../Models/ProductsModel.js')

const GetProductContoller = async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });

        res.status(200).json({
            status: "success",
            message: "Products get successfully",
            data: products,
        });

    } catch (error) {
        console.error("Get Product Error:", error);

        res.status(500).json({
            status: "error",
            message: "Failed to get products",
            error: error.message,
        });
    }
};



module.exports = GetProductContoller;