import React from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import '../../../components/ProductCard/./productCard.css'
import { useProducts } from '../../ProductContext/ProductsContext';
import StockUpdate from '../../../components/StockUPdateform/StockUpdateForm';
import { toast } from 'react-toastify';
// import UpdateProduct from '../ProductUpdateForm/ProductUpdateForm';
import { useState } from 'react';
import { useEffect } from 'react';
import defaultImage from '../../../assets/images/default-image.jpg'
import API_URL from '../../../config/apiConfig';




export default function DProductCard({ product, isStockPage = false }) {

    const { name, brand, purchasePrice, wholesalePrice, stock, retailPrice, image } = product;
    const { deleteProduct, updateProduct, fetchProducts } = useProducts();

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${product.name}?`
        );

        if (!confirmDelete) return;

        const result = await deleteProduct(product._id);

        if (result.success) {
            toast.success("Product deleted successfully!");
        } else {
            toast.error(result.message);
        }
    };

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



    const [images, setImages] = useState(null);
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
            setImages(file);
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
            if (images) {
                data.append("image", images);
            }

            const response = await fetch(
                `${API_URL}/update-Product/${product._id}`,
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
            console.log("UPDATED PRODUCT FROM SERVER:", result.data);

            updateProduct(result.data);

            await fetchProducts();

            toast.success("পণ্য সফলভাবে আপডেট হয়েছে!");



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
        <div className="product-card rounded shadow !p-3">
            <div className={`product-header  ${stock <= 0 ? "stock-out" : " "} ${stock <= 10 ? "low-stock" : " "}`}>
                {
                    image ?
                        <img className='object-contain w-full' src={image} alt={name} /> : <img className='object-contain w-full' src={defaultImage} alt={'photo'} />

                }
                <div className="delete-button">
                    <RiDeleteBin6Fill
                        onClick={handleDelete}
                        className='text-red-800 text-[32px]'
                    />
                </div>
            </div>

            <div className="product-body flex flex-col !gap-[2px]  !my-4">
                <h5>নাম: {name}</h5>
                <p>ব্র্যান্ড : {brand}</p>
                <p className='text-red-600'>ক্রয়মূল্য: {purchasePrice} Tk</p>
                <p>পাইকারি মূল্য: {wholesalePrice} Tk</p>
                <p className='font-semibold '>স্টক: {stock} আইটেম</p>
                <p className='text-green-600 font-semibold'>খুচরা মূল্য: {retailPrice} টাকা</p>
            </div>
            <div className="footer !pb-1 flex justify-between px-5  gap-2">
                {
                    isStockPage ? <StockUpdate product={product} /> :
                        <button onClick={() => document.getElementById(`my_modal_${product._id}`).showModal()} className="btn bg-magenta text-white w-full rounded !py-2 flex items-center justify-center cursor-pointer">পরিবর্তন</button>
                }
                {/* <button   onClick={handleDelete}      className='bg-red-800 text-white w-full rounded !py-2 flex items-center justify-center cursor-pointer'>Delete</button> */}
            </div>

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow">

                {/* <h2 className="text-2xl font-bold mb-6">
                    পণ্য আপডেট করুন
                </h2> */}
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                {/* <button >open modal</button> */}
                <dialog
                    id={`my_modal_${product._id}`}
                    className="modal "
                >
                    <div className="modal-box w-11/12 max-w-5xl !p-10">
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 "
                        >

                            {/* Name */}
                            <div>
                                <label className="block !!mb-1 font-medium">
                                    পণ্যের নাম
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg !px-3 py-2"
                                />
                            </div>


                            {/* Brand */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    ব্র্যান্ড
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg !px-3 py-2"
                                />
                            </div>


                            {/* Category */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    ক্যাটাগরি
                                </label>

                                <select
                                    name="productCategory"
                                    value={formData.productCategory}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg !px-3 py-2"
                                >
                                    <option value="">
                                        ক্যাটাগরি নির্বাচন করুন
                                    </option>

                                    <option value="Cosmetics">
                                        কসমেটিকস
                                    </option>

                                    <option value="Accessories">
                                        অ্যাক্সেসরিজ
                                    </option>
                                </select>
                            </div>


                            {/* Stock */}
                            <div>
                                <label className="block !!mb-1 font-medium">
                                    স্টক
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border rounded-lg !px-3 !py-2"
                                />
                            </div>


                            {/* Purchase Price */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    ক্রয় মূল্য
                                </label>

                                <input
                                    type="number"
                                    name="purchasePrice"
                                    value={formData.purchasePrice}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border rounded-lg !px-3 !py-2"
                                />
                            </div>


                            {/* Wholesale Price */}
                            <div>
                                <label className="block !!mb-1 font-medium">
                                    পাইকারি মূল্য
                                </label>

                                <input
                                    type="number"
                                    name="wholesalePrice"
                                    value={formData.wholesalePrice}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border rounded-lg !px-3 !py-2"
                                />
                            </div>


                            {/* Retail Price */}
                            <div>
                                <label className="block !!mb-1 font-medium">
                                    খুচরা মূল্য
                                </label>

                                <input
                                    type="number"
                                    name="retailPrice"
                                    value={formData.retailPrice}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border rounded-lg !px-3 py-2"
                                />
                            </div>


                            {/* Weight */}
                            <div>
                                <label className="block !!mb-1 font-medium">
                                    ওজন
                                </label>

                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !px-3 py-2"
                                />
                            </div>


                            {/* Expiry Date */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    মেয়াদ শেষ হওয়ার তারিখ
                                </label>

                                <input
                                    type="date"
                                    name="expiredDate"
                                    value={formData.expiredDate}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg !px-3 py-2"
                                />
                            </div>


                            {/* Existing Image */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    বর্তমান ছবি
                                </label>

                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 object-contain rounded-lg border"
                                    />
                                ) : (
                                    <p className="text-gray-500">
                                        কোনো ছবি নেই
                                    </p>
                                )}
                            </div>


                            {/* New Image */}
                            <div>
                                <label className="block !mb-1 font-medium">
                                    নতুন ছবি
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border rounded-lg !px-3 !py-2"
                                />
                            </div>


                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block !mb-1 font-medium">
                                    বিবরণ
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full border rounded-lg !px-3 !py-2"
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
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn w-full !py-4 bg-red-700  font-semibold !mt-2 rounded-lg text-white">এখান থেকে বের হন</button>
                            </form>
                        </div>
                    </div>
                </dialog>


            </div>
        </div >
    )
}
