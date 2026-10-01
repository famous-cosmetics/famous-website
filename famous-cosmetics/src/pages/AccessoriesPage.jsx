import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useProducts } from "../components/DataShareContext/DataShareContext";
import Pagination from "../components/pagination/Pagination";
import SearchBar from "../components/ProductFilter/Search";
import ProductNotFound from "../components/ProductFilter/ProductNotFound";

export default function AccessoriesPage() {
    const { products, loading, error } = useProducts();

    const [search, setSearch] = useState("");
    const [currentProducts, setCurrentProducts] = useState([]);

    // Search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // শুধু Accessories
    const accessoriesProducts = useMemo(() => {
        return (
            products?.filter(
                (product) =>
                    product.productCategory?.toLowerCase() === "accessories"
            ) || []
        );
    }, [products]);

    // Accessories এর মধ্যে Search
    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return accessoriesProducts;
        }

        return accessoriesProducts.filter((product) => {
            return (
                product.name?.toLowerCase().includes(searchText) ||
                product.brand?.toLowerCase().includes(searchText) ||
                product.productCategory?.toLowerCase().includes(searchText)
            );
        });
    }, [accessoriesProducts, search]);

    // Loading
    if (loading) {
        return <h3>Loading Products...</h3>;
    }

    // Error
    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div className="accessories-page">

            <h2 className="!py-5">একসেসোরিজ</h2>

            {/* Search */}
            <div className="filter-section">
                <div className="search-bar-container bg-magenta" >
                    <h4 className="!text-white">
                        একসেসোরিজ পণ্য খুজুন
                    </h4>
                    <SearchBar
                        handleSearch={handleSearch}
                        search={search}
                    />
                </div>
            </div>

            {/* Products */}
            <div className="accessories-product gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 !py-10 !px-5">

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
                    products={filteredProducts}
                    setCurrentProducts={setCurrentProducts}
                    productsPerPage={35}
                />

            </div>

        </div>
    );
}