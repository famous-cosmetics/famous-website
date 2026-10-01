import { createContext, useContext, useEffect, useState } from "react";
const ProductsContext = createContext();
import API_URL from "../../config/apiConfig";

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const fetchProducts = async (showLoading = false) => {
        try {
            if (showLoading) setLoading(true);

            const response = await fetch(`${API_URL}/api/getProduct`);

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const result = await response.json();
            setProducts(result.data);

            setError(null);
        } catch (error) {
            console.error("Get Products Error:", error);
            setError(error.message);
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(true);
    }, []);

    // First time app load হলে fetch হবে
    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                loading,
                error,
                fetchProducts
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};


// Custom Hook
export const useProducts = () => {

    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error(
            "useProducts must be used inside ProductsProvider"
        );
    }

    return context;
};