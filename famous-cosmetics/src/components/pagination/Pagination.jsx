import React, { useEffect, useState } from "react";

export default function Pagination({
    products = [],
    setCurrentProducts,
    productsPerPage,
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        products.length / productsPerPage
    );

    useEffect(() => {
        const safePage =
            totalPages > 0
                ? Math.min(currentPage, totalPages)
                : 1;

        if (safePage !== currentPage) {
            setCurrentPage(safePage);
            return;
        }

        const firstIndex =
            (safePage - 1) * productsPerPage;

        const currentData = products.slice(
            firstIndex,
            firstIndex + productsPerPage
        );

        // Always sync updated product objects
        setCurrentProducts(currentData);

    }, [
        products,
        currentPage,
        productsPerPage,
        totalPages,
        setCurrentProducts,
    ]);

    if (products.length <= productsPerPage) {
        return null;
    }

    return (
        <div className="pagination-div !bg-white flex items-center justify-center gap-2 py-5">

            {/* Previous */}
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                    )
                }
                className="btn bg-red-800 text-white"
            >
                পিছনে
            </button>

            {/* Page Numbers */}
            {Array.from(
                { length: totalPages },
                (_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() =>
                                setCurrentPage(pageNumber)
                            }
                            className={`btn ${currentPage === pageNumber
                                ? "btn-primary bg-plum"
                                : ""
                                }`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
            )}


            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                    )
                }
                className="btn bg-gold text-white"
            >
                সামনে
            </button>
        </div>
    );
}