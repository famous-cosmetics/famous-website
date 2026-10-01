import { useEffect, useState } from "react";
import { useProducts } from "../ProductContext/ProductsContext";
import API_URL from "../../config/apiConfig";


export default function Dashboard() {
    const [parties, setParties] = useState([]);
    const [loadingData, setLoadingDAta] = useState(true);
    const { products, loading, } = useProducts();
    const [expiringProducts, setExpiringProducts] = useState([]);
    const [stock, setStock] = useState([])



    const fetchParties = async () => {
        try {
            setLoadingDAta(true);

            const response = await fetch(
                `${API_URL}/dashboard/Parties-Data`
            );

            const data = await response.json();

            if (data.success) {
                setParties(data.data);
            } else {
                // toast.error(data.message);+
            }

        } catch (error) {

            console.error("Get Party Error:", error);

            toast.error("Failed to load parties");

        } finally {
            setLoadingDAta(false);
        }
    };


    const cosmeticsItemFilter = products.filter((items) => items.productCategory === "Cosmetics")
    const accesoriesItemFilter = products.filter((items) => items.productCategory === "Accessories")



    useEffect(() => {
        const today = new Date();

        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        const result = products.filter((product) => {
            const expiryDate = new Date(product.expiredDate);

            return expiryDate >= today && expiryDate <= oneMonthLater;
        });

        setExpiringProducts(result);
        const OutOfStock = products.filter((items) => {
            return items.stock < 1;
        });
        fetchParties();
        setStock(OutOfStock);
    }, [products]);




    return (
        <div className="!px-2 sm:px-2 md:px-1 lg:px-0">
            <h2 className="text-[22px]! sm:text-[24px]! lg:text-[30px] xl:text-[34px !pb-5">অ্যাডমিন ড্যাশবোর্ড</h2>
            <hr />


            <div>
                {
                    !loadingData ? <div className="short-cuts grid grid-cols-2 !mt-[50px]  gap-2 sm:gap-3 md:gap-4 lg-:gap-5 xl:gap-6">
                        <div className="card shadow !p-5 text-center  bg-gray-200">
                            <h3>মোট পণ্য</h3>
                            <p>{products.length} আইটেম</p>
                        </div>
                        <div className="card shadow !p-5 text-center bg-gray-200 ">
                            <h3>মোট কসমেটিক</h3>
                            <p>{cosmeticsItemFilter.length} আইটেম</p>
                        </div>
                        <div className="card shadow !p-5 text-center  bg-gray-200">
                            <h3>মোট একসেসোরিজ</h3>
                            <p>{accesoriesItemFilter.length} আইটেম</p>
                        </div>
                        <div className="card shadow !p-5 text-center bg-gray-200 ">
                            <h3>মোট মেয়াদোত্তীর্ণ</h3>
                            <p>{expiringProducts.length} আইটেম</p>
                        </div>
                        <div className="card shadow !p-5 text-center  bg-gray-200">
                            <h3>স্টকে পণ্য নেই</h3>
                            <p>{stock.length} আইটেম</p>
                        </div>
                        <div className="card shadow !p-5 text-center bg-gray-200 ">
                            <h3>মোট পাওনাদার</h3>
                            <p>{parties.length} ব্যক্তি</p>
                        </div>
                    </div> : <p className="flex h-screen text-xl font-semibold items-center justify-center text-red-600 my-auto">Data Loding ..</p>
                }
            </div>
        </div>
    )
}
