import React, { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useProducts } from "../ProductContext/ProductsContext";
import Pagination from "../../components/pagination/Pagination";
import DProductCard from "../Components/DProductCard/DProductCard";
import StockUpdate from "../../components/StockUPdateform/StockUpdateForm";
import ProductNotFound from "../../components/ProductFilter/ProductNotFound";

export default function StockOutProduct() {
    const { products, loading } = useProducts();
    // const [stockUpdate, setStockUPdate] = useState(false)

    const [currentProducts, setCurrentProducts] = useState([]);

    // Stock Out / Low Stock Products
    const stockOutProducts = useMemo(() => {
        return products.filter((product) => {
            return product.stock < 10;
        });
    }, [products]);

    if (loading) {
        return <p className="flex h-screen text-xl font-semibold items-center justify-center text-red-600 my-auto">Data Loding ..</p>
    }






    return (
        <div className="stock-out-products-page pl-5">

            {/* Title */}
            <div className="text-center flex justify-between items-center !py-6 !px-5 bg-gray-300">
                <h3 className="text-[14px] sm:[18px] md:text-2xl  lg:text-2xl font-semibold">
                    স্টক শেষ হতে যাচ্ছে
                </h3>

                <p className="">
                    Total Low Stock Products:{" "}
                    <span className="text-red-600 text-xl font-bold">
                        {stockOutProducts.length}
                    </span>
                </p>
            </div>

            {/* Products */}
            <div className="product-gallery grid grid-cols-2 !mx-auto sm:grid-cols-3 lg:grid-cols-4 gap-[15px] !mt-[50px]">

                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <DProductCard
                            isStockPage={true}
                            product={product}
                            key={product._id}
                        />
                    ))
                ) : (
                    <div className="col-span-full !w-full !m-0 !p-0">
                        <ProductNotFound />
                    </div>
                )}

            </div>

            {/* Pagination */}
            <div className="pagination-div py-10">

                <Pagination
                    products={stockOutProducts}
                    setCurrentProducts={setCurrentProducts}
                    productsPerPage={25}
                />

            </div>
        </div>
    );
}