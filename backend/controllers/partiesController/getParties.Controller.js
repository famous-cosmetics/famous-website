const Product = require("../../Models/Party.model");

const getPartyController = async (req, res) => {
    try {

        const products = await Product
            .find()
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });

    } catch (error) {

        console.error("Get Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

module.exports = {
    getPartyController,
};