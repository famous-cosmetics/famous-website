import React, { useState } from "react";
import { toast } from 'react-toastify'






export default function StockUpdate({ product, onUpdated }) {
    console.log(product)
    const [showInput, setShowInput] = useState(false);
    const [stock, setStock] = useState(product);
    const [loading, setLoading] = useState(false);

    console.log(stock)


    const handleUpdateStock = async () => {
        if (stock === "" || Number(stock) < 0) {
            toast.warning("Please enter a valid stock");
            return;
        }
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:5000/update-stock/${product._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        stock: Number(stock),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            alert("Stock updated successfully!");
            toast.success("Stock updated successfully!");

            setShowInput(false);

            // Parent product list refresh/update করার জন্য
            if (onUpdated) {
                onUpdated(data.data);
            }

        } catch (error) {

            console.error("Stock update error:", error);
            alert(error.message);

        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="w-full">

            {!showInput ? (

                <div className="button flex w-[100%]">
                    <button
                        onClick={() => setShowInput(true)}
                        className="btn btn-md !px-2 w-[100%] btn-primary"
                    >
                        Update Stock
                    </button>

                </div>
            ) : (

                <div className="flex gap-2 items-center">

                    <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="input input-bordered input-sm w-30"
                    />

                    <button
                        onClick={handleUpdateStock}
                        disabled={loading}
                        className="btn btn-sm bg-green-600 !px-2 text-white"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                    <button
                        onClick={() => {
                            setShowInput(false);
                            setStock(product.stock);
                        }}
                        className="btn btn-sm !px-2 bg-red-600 text-white"
                    >
                        Cancel
                    </button>

                </div>

            )}

        </div>
    );
}