const Product = require("../Models/ProductsModel");
const cloudinary = require("../config/config.cloudinary");

const FullProductUpdateController = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("UPDATE ID:", id);
        console.log("UPDATE BODY:", req.body);
        console.log("UPDATE FILE:", req.file);

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updateData = {
            name: req.body.name,
            brand: req.body.brand,
            productCategory: req.body.productCategory,
            stock: Number(req.body.stock),
            purchasePrice: Number(req.body.purchasePrice),
            wholesalePrice: Number(req.body.wholesalePrice),
            retailPrice: Number(req.body.retailPrice),
            weight: req.body.weight,
            expiredDate: req.body.expiredDate || null,
            description: req.body.description,
        };

        // নতুন image দিলে Cloudinary তে upload হবে
        if (req.file) {
            const cloudinaryResult = await new Promise(
                (resolve, reject) => {
                    const uploadStream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "famous-cosmetics/products",
                            },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }
                            }
                        );

                    uploadStream.end(req.file.buffer);
                }
            );

            updateData.image = cloudinaryResult.secure_url;
        }

        console.log("UPDATE DATA:", updateData);

        const updatedProduct =
            await Product.findByIdAndUpdate(
                id,
                {
                    $set: updateData,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        console.log("UPDATED PRODUCT:", updatedProduct);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        console.error("PRODUCT UPDATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        });
    }
};

module.exports = FullProductUpdateController;