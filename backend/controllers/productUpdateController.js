

const Product = require("../Models/ProductsModel.js");

const UpdateStockController = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        // Validation
        if (stock === undefined || stock === null) {
            return res.status(400).json({
                success: false,
                message: "Stock is required",
            });
        }

        if (Number(stock) < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: {
                    stock: Number(stock),
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        console.error("Update Stock Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update stock",
            error: error.message,
        });
    }
};

module.exports = UpdateStockController;