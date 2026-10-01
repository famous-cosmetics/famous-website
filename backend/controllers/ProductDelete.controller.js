const ProductModel = require("../Models/ProductsModel");



const DeleteProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });

    } catch (error) {
        console.error("Delete Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message,
        });
    }
};

module.exports = DeleteProductController;