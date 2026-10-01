import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../pagination/Pagination";
import ProductNotFound from "../ProductFilter/ProductNotFound";

export default function CosmeticsSection({ data = [] }) {
    const [currentProducts, setCurrentProducts] = useState([]);



    // Cosmetics products filter
    const filteredCosmeticsProducts = useMemo(() => {
        return data.filter(
            (product) =>
                product.productCategory?.toLowerCase() === "cosmetics"
        );
    }, [data]);

    return (
        <div className="cosmetics-section">
            <h3 className="text-center text-[24px]! md:text-[30px]! !text-3xl !py-10">
                কসমেটিক বিভাগ
            </h3>

            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 !py-10">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="col-span-full !w-full !m-0 !p-0">
                        <ProductNotFound />
                    </div>

                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <Pagination
                    products={filteredCosmeticsProducts}
                    setCurrentProducts={setCurrentProducts}
                    productsPerPage={25}
                />
            </div>
        </div>
    );
}