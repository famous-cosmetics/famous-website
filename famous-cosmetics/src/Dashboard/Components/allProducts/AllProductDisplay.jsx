

import React, { useMemo, useState } from "react";
import DProductCard from "../DProductCard/DProductCard";
import { useProducts } from "../../ProductContext/ProductsContext";
import Pagination from "../../../components/pagination/Pagination";
import ProductNotFound from "../../../components/ProductFilter/ProductNotFound";

export default function AllProductDisplay() {
    const { products, loading } = useProducts();

    const [search, setSearch] = useState("");
    const [currentProducts, setCurrentProducts] = useState([]);



    // Search functionality
    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return products;
        }

        return products.filter((product) => {
            return (
                product.name?.toLowerCase().includes(searchText) ||
                product.brand?.toLowerCase().includes(searchText) ||
                product.productCategory?.toLowerCase().includes(searchText)
            );
        });
    }, [products, search]);

    if (loading) {
        return <p className="flex h-screen text-xl font-semibold items-center justify-center text-red-600 my-auto">Data Loding ..</p>
    }

    return (
        <div className="All-products-dashboard pl-5">

            {/* Header */}
            <div className=" grid grid-cols-2 md:grid lg:grid-cols-2 xl:grid-cols-3 flex justify-between! bg-gray-300 !p-5 items-center mb-6">
                <div className=""> <h3 className=" sm:text-sm md:text-xl  md:text-3xl font-semibold">
                    সব ধরনের পণ্য
                </h3></div>
                <div className="mb-8  flex justify-center">
                    <div className="w-full max-w-xl relative">
                        <input
                            type="text"
                            placeholder="Search by product name, brand or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered w-full !px-4"
                        />

                        {/* Clear button */}
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-red-500 font-semibold"
                            >
                                Clear
                            </button>
                        )}

                    </div>
                </div>

                <div className="flex justify-end hidden md:block lg:block xl:block 2xl:block">
                    <p className="text-xl flex justify-end  !pt-3 !md:pt-0  xl:pt-0!">
                        Total:{" "}
                        <span className="font-bold">
                            {filteredProducts.length}
                        </span>
                    </p>
                </div>
            </div>

            {/* Search Bar */}

            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5  gap-3">

                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <DProductCard
                            product={product}
                            key={product._id}
                        />
                    ))
                ) : (
                    <div className="!w-full !m-0 !p-0">
                        <ProductNotFound />
                    </div>
                )}

            </div>

            {/* Pagination */}
            <div className="pagination-div">
                <Pagination
                    products={filteredProducts}
                    setCurrentProducts={setCurrentProducts}
                    productsPerPage={35}
                />
            </div>

        </div>
    );
}