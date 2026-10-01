import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../../config/apiConfig";
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const deleteProduct = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/api/product/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (data.success) {


                setProducts((previousProducts) =>
                    previousProducts.filter(
                        (product) => product._id !== id
                    )
                );

                return {
                    success: true,
                    message: data.message,
                };
            }

            return {
                success: false,
                message: data.message,
            };

        } catch (error) {
            console.error("Delete Error:", error);

            return {
                success: false,
                message: "Server connection failed",
            };
        }
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === updatedProduct._id
                    ? updatedProduct
                    : product
            )
        );
    };


    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/getProduct`
            );

            const data = await response.json();
            if (data.status === "success") {
                setProducts(data.data);
            }
        } catch (error) {
            console.error("Products fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                loading,
                updateProduct,
                fetchProducts,
                deleteProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductsContext);
};