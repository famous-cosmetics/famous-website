const Product = require("../Models/ProductsModel");
const cloudinary = require("../config/config.cloudinary");

const ProductController = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        let imageUrl = "";

        // =========================
        // 1. Cloudinary Upload
        // =========================
        if (req.file) {
            console.log("STEP 1: Starting Cloudinary upload...");

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

            imageUrl = cloudinaryResult.secure_url;

            console.log("STEP 2: Cloudinary upload complete");
            console.log("Cloudinary URL:", imageUrl);
        }

        // =========================
        // 2. Product Data
        // =========================
        const productData = {
            ...req.body,
            image: imageUrl,
        };

        console.log("STEP 3: FINAL PRODUCT:", productData);

        // =========================
        // 3. MongoDB Save
        // =========================
        console.log("STEP 4: Saving product to MongoDB...");

        const newProduct = await Product.create(productData);

        console.log("STEP 5: Product saved successfully!");
        console.log("SAVED PRODUCT:", newProduct);

        // =========================
        // 4. Response
        // =========================
        return res.status(201).json({
            success: true,
            message: "Product uploaded successfully",
            data: newProduct,
        });

    } catch (error) {

        console.error("🔥 PRODUCT UPLOAD ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload product",
            error: error.message,
        });
    }
};

module.exports = {
    ProductController,
};