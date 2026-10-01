const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            // required: true,
            trim: true,
        },
        productCategory: {
            type: String,
            required: true,
        },

        weight: {
            type: String,
            required: false,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        expiredDate: {
            type: Date,
            required: false,
        },

        purchasePrice: {
            type: Number,
            required: true,
        },

        wholesalePrice: {
            type: Number,
            required: true,
        },

        retailPrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        expiredDate: {
            type: String,
            required: false,
        },

        // customerWholesale: {
        //     type: Number,
        //     required: true,
        // },



        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("ProductCollection", productSchema);

module.exports = ProductModel;