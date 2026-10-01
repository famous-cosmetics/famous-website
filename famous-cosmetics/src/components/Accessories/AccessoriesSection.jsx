import React, { useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

import "./accessories.css";
import Pagination from "../pagination/Pagination";
import ProductNotFound from "../ProductFilter/ProductNotFound";

export default function AccessoriesSection({ data = [] }) {

    const [currentProducts, setCurrentProducts] = useState([]);

    // Only Accessories products
    const filteredAccessoriesProducts = useMemo(() => {
        return data.filter(
            (product) =>
                product.productCategory?.toLowerCase() === "accessories"
        );
    }, [data]);

    return (
        <div className="Accessories-section !py-[30px]">

            <h3>একসেসোরিজ বিভাগ</h3>

            {/* Accessories Products */}
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5  !py-10 gap-5">

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
                    products={filteredAccessoriesProducts}
                    setCurrentProducts={setCurrentProducts}
                    productsPerPage={25}
                />
            </div>

        </div>
    );
}