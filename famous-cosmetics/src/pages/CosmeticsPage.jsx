import ProductCard from "../components/ProductCard/ProductCard";
import { useProducts } from "../components/DataShareContext/DataShareContext";
import { useMemo, useState } from "react";
import Pagination from "../components/pagination/Pagination";
import SearchBar from "../components/ProductFilter/Search";
import ProductNotFound from "../components/ProductFilter/ProductNotFound";

export default function CosmeticsPage() {
    const { products, loading, error } = useProducts();

    const [currentProducts, setCurrentProducts] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // প্রথমে শুধু Cosmetics products
    const cosmeticsProducts = useMemo(() => {
        return (
            products?.filter(
                (product) =>
                    product.productCategory?.toLowerCase() === "cosmetics"
            ) || []
        );
    }, [products]);

    // তারপর Cosmetics-এর ভিতরে Search
    const filteredProducts = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) {
            return cosmeticsProducts;
        }

        return cosmeticsProducts.filter((product) => {
            return (
                product.name?.toLowerCase().includes(value) ||
                product.brand?.toLowerCase().includes(value) ||
                product.productCategory?.toLowerCase().includes(value)
            );
        });
    }, [cosmeticsProducts, search]);

    if (loading) {
        return <h3>Loading Products...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div className="cosmetics-page">

            <h2 className="!py-5">কসমেটিকস</h2>

            <div className="filter-section">
                <div className="search-bar-container bg-magenta" >
                    <h4 className="!text-white">
                        কসমেটিক পণ্য খুজুন
                    </h4>

                    <SearchBar
                        handleSearch={handleSearch}
                        search={search}
                    />
                </div>
            </div>

            <div className="cosmetics-items">
                <div className="cosmetics-product grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 !py-10 !px-5">

                    {currentProducts.length === 0 ? (
                        <div className="col-span-full !w-full !m-0 !p-0">
                            <ProductNotFound />
                        </div>
                    ) : (
                        currentProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))
                    )}

                </div>
            </div>

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