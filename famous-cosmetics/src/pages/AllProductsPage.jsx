import { useMemo, useState } from "react";

import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/ProductFilter/Search";
import ProductNotFound from "../components/ProductFilter/ProductNotFound";
import Pagination from "../components/pagination/Pagination";

import { useProducts } from "../components/DataShareContext/DataShareContext";

export default function AllProductsPage() {

    const {
        products,
        loading,
        error
    } = useProducts();

    const [search, setSearch] = useState("");
    const [currentProducts, setCurrentProducts] = useState([]);

    // Search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Filter products
    const filteredProducts = useMemo(() => {

        const value = search.trim().toLowerCase();

        if (!value) {
            return products;
        }

        return products.filter((product) => {

            return (
                product.name?.toLowerCase().includes(value) ||
                product.brand?.toLowerCase().includes(value) ||
                product.productCategory?.toLowerCase().includes(value)
            );

        });

    }, [products, search]);


    // Loading
    if (loading) {
        return <h3>Loading Products...</h3>;
    }

    // Error
    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div className="all-products-page">

            <h2 className="!py-5 text-plum">সব ধরনের পণ্য</h2>

            {/* Search */}
            <div className="filter-section ">

                <div className="search-bar-container bg-magenta" >

                    <h4 className="!text-white">সব ধরনের পণ্য খুজুন</h4>

                    <SearchBar
                        handleSearch={handleSearch}
                        search={search}
                    />

                </div>

            </div>


            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 !py-10 !px-5">

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
            <Pagination
                products={filteredProducts}
                setCurrentProducts={setCurrentProducts}
                productsPerPage={35}
            />

        </div>
    );
}