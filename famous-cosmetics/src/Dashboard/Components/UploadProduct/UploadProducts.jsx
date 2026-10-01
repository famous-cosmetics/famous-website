import React, { useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../../../config/apiConfig";




const UploadProducts = () => {

    const initialProduct = {
        name: "",
        brand: "",
        productCategory: "",
        weight: "",
        stock: "",
        purchasePrice: "",
        wholesalePrice: "",
        retailPrice: "",
        expiredDate: "",
        description: "",
        image: null,
    };

    const [uploading, setUploading] = useState(false);
    const [product, setProduct] = useState(initialProduct);


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files?.[0] || null
                        : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("brand", product.brand);
        formData.append("productCategory", product.productCategory);
        formData.append("weight", product.weight);
        formData.append("stock", product.stock);
        formData.append("purchasePrice", product.purchasePrice);
        formData.append("wholesalePrice", product.wholesalePrice);
        formData.append("retailPrice", product.retailPrice);
        formData.append("expiredDate", product.expiredDate);
        formData.append("description", product.description);

        if (product.image) {
            formData.append("image", product.image);
        }

        try {

            setUploading(true);

            const response = await fetch(
                `${API_URL}/upload/product`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            console.log("Backend Response:", data);

            if (!response.ok) {
                toast.error(data.message || "Product upload failed");
                return;
            }

            // Upload successful
            toast.success("Product uploaded successfully!");

            // Form clear
            setProduct(initialProduct);

        } catch (error) {

            console.error("Upload Error:", error);

            toast.error("Server connection failed");

        } finally {

            setUploading(false);

        }
    };




    return (
        <div className="product-form-container">

            <div className="product-form ">

                <h2 className="text-red-600">পণ্য যোগ করুন</h2>
                <p>আপনার স্টোরে একটি নতুন পণ্য আপলোড করুন</p>

                <form onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <div className="form-group">
                        <label>পণ্যের নাম</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Brand */}
                    <div className="form-group">
                        <label>
                            ব্র্যান্ডের নাম</label>
                        <input
                            type="text"
                            name="brand"
                            placeholder="Enter brand name"
                            value={product.brand}
                            onChange={handleChange}
                        />
                    </div>



                    {/* Category & Weight */}
                    <div className="form-row">

                        <div className="form-group">
                            <label>পণ্যের ধরন</label>

                            <select
                                name="productCategory"
                                value={product.productCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    নির্বাচন করুন
                                </option>
                                <option value="Cosmetics">
                                    কসমেটিক
                                </option>
                                <option value="Accessories">
                                    একসেসোরিজ
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                ওজন</label>

                            <input
                                type="text"
                                name="weight"
                                placeholder="e.g. 50g"
                                value={product.weight}
                                onChange={handleChange}
                            />
                        </div>

                    </div>


                    {/* Prices */}
                    <div className="form-row">

                        <div className="form-group">
                            <label>ক্রয়মূল্য</label>

                            <input
                                type="number"
                                name="purchasePrice"
                                placeholder="৳ Purchase price"
                                value={product.purchasePrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>পাইকারি মূল্য</label>

                            <input
                                type="number"
                                name="wholesalePrice"
                                placeholder="৳ Wholesale price"
                                value={product.wholesalePrice}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>খুচরা মূল্য</label>

                            <input
                                type="number"
                                name="retailPrice"
                                placeholder="৳ Retail price"
                                value={product.retailPrice}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image */}
                        <div className="form-group">
                            <label>পণ্যের ছবি</label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}

                            />
                        </div>

                    </div>

                    {/* Expired Date and Stock */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>
                                স্টকে আছে</label>

                            <input
                                type="number"
                                name="stock"
                                placeholder="Enter stock quantity"
                                value={product.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>মেয়াদোত্তীর্ণের তারিখ</label>

                            <input
                                type="date"
                                name="expiredDate"
                                value={product.expiredDate}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                    {/* Description */}
                    <div className="form-group">
                        <label>পণ্য সম্পর্কে লিখুন</label>

                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Write product description..."
                            value={product.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>




                    {/* Buttons */}
                    <div className="form-buttons">

                        {/* <button type="reset">
                            Reset
                        </button> */}

                        <button type="submit">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadProducts;