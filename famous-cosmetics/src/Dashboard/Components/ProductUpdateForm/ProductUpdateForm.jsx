import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../../../config/apiConfig";



const UpdateProduct = ({ product, onUpdated }) => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        productCategory: "",
        stock: "",
        purchasePrice: "",
        wholesalePrice: "",
        retailPrice: "",
        weight: "",
        expiredDate: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Existing product data form-এ বসানো
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                brand: product.brand || "",
                productCategory: product.productCategory || "",
                stock: product.stock ?? "",
                purchasePrice: product.purchasePrice ?? "",
                wholesalePrice: product.wholesalePrice ?? "",
                retailPrice: product.retailPrice ?? "",
                weight: product.weight || "",
                expiredDate: product.expiredDate
                    ? new Date(product.expiredDate)
                        .toISOString()
                        .split("T")[0]
                    : "",
                description: product.description || "",
            });
        }
    }, [product]);

    // Input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    // Update product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("brand", formData.brand);
            data.append("productCategory", formData.productCategory);
            data.append("stock", formData.stock);
            data.append("purchasePrice", formData.purchasePrice);
            data.append("wholesalePrice", formData.wholesalePrice);
            data.append("retailPrice", formData.retailPrice);
            data.append("weight", formData.weight);
            data.append("expiredDate", formData.expiredDate);
            data.append("description", formData.description);

            // নতুন image দিলে শুধু তখন পাঠাবে
            if (image) {
                data.append("image", image);
            }

            const response = await fetch(
                `${API_URL}/dashboard/products/${product._id}`,
                {
                    method: "PUT",
                    body: data,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Product update failed"
                );
            }

            toast.success("পণ্য সফলভাবে আপডেট হয়েছে!");

            if (onUpdated) {
                onUpdated(result.data);
            }

        } catch (error) {
            console.error("Update Product Error:", error);

            toast.error(
                error.message || "পণ্য আপডেট করা যায়নি"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <p className="text-center py-10">
                কোনো পণ্য নির্বাচন করা হয়নি
            </p>
        );
    }

    return (
        <div className="w-[90%] !mx-auto sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[50%] 2xl:max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
                পণ্য আপডেট করুন
            </h2>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button >open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        {/* Name */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                পণ্যের নাম
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Brand */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Category */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Category
                            </label>

                            <select
                                name="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            >
                                <option value="">
                                    Category নির্বাচন করুন
                                </option>

                                <option value="Cosmetics">
                                    Cosmetics
                                </option>

                                <option value="Accessories">
                                    Accessories
                                </option>
                            </select>
                        </div>


                        {/* Stock */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Purchase Price */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Purchase Price
                            </label>

                            <input
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Wholesale Price */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Wholesale Price
                            </label>

                            <input
                                type="number"
                                name="wholesalePrice"
                                value={formData.wholesalePrice}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Retail Price */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Retail Price
                            </label>

                            <input
                                type="number"
                                name="retailPrice"
                                value={formData.retailPrice}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Weight */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Weight
                            </label>

                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Expiry Date */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                name="expiredDate"
                                value={formData.expiredDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Existing Image */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                Current Image
                            </label>

                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                            ) : (
                                <p className="text-gray-500">
                                    Image নেই
                                </p>
                            )}
                        </div>


                        {/* New Image */}
                        <div>
                            <label className="block !mb-1 font-medium">
                                নতুন Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block !mb-1 font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border rounded-lg !px-3 !px-2"
                            />
                        </div>


                        {/* Submit */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white !py-3 rounded-lg font-semibold disabled:opacity-50"
                            >
                                {loading
                                    ? "আপডেট হচ্ছে..."
                                    : "পণ্য আপডেট করুন"}
                            </button>
                        </div>

                    </form>
                    <div className="modal-action w-full">
                        <form method="dialog w-full">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn !w-full !bg-red-600">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default UpdateProduct;