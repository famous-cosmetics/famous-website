import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination/Pagination";
import API_URL from "../../config/apiConfig";

export default function PartyDue() {
    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        mobile: "",
        amount: "",
    });

    const fetchParties = async () => {
        try {
            setLoading(true);

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
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchParties();
    }, []);



    const handleRemoveParty = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this Party?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API_URL}/dashboard/delete/party/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (data.success) {
                toast.success("Party removed successfully!");

                // UI থেকে সাথে সাথে remove
                setParties((previous) =>
                    previous.filter((party) => party._id !== id)
                );
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to remove customer");
        }
    };





    // Input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Sending Customer:", customer);

        // Basic validation
        if (
            !customer.name ||
            !customer.address ||
            !customer.mobile ||
            !customer.amount
        ) {
            toast.error("সবগুলো তথ্য পূরণ করুন");
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/dashboard/add-party`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(customer),
                }
            );

            const data = await response.json();

            console.log("Server Response:", data);

            if (data.success) {
                toast.success("Customer added successfully!");

                // Form clear
                setCustomer({
                    name: "",
                    address: "",
                    mobile: "",
                    amount: "",
                });

                // Close modal
                document
                    .getElementById("my_modal_4")
                    .close();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Error:", error);

            toast.error("Server connection failed");
        }
    };


    return (
        <div className="party-due overflow-hidden">

            <h3 className="text-center font-semibold text-2xl! pt-7">
                পাওনাদার
            </h3>

            <br />
            <hr />

            <div className="due-party-list !my-[20px]">

                {/* Add Party */}
                <div className="add-party flex !w-full justify-between bg-gray-200 !py-[25px] !px-[20px]">

                    <div className="flex  justify-between w-full">

                        <p className="flex items-center font-bold text-[13px] sm:text-[16px] md:text-[20px] xl:text-[24px] ">
                            নতুন পাওনাদার যোগ করুন
                        </p>

                        <button
                            className="btn !px-5 !py-2 bg-green-800 text-white"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_4")
                                    .showModal()
                            }
                        >
                            যোগ করুন <span className="text-xl">+</span>
                        </button>

                    </div>

                </div>


                {/* Modal */}
                <dialog
                    id="my_modal_4"
                    className="modal"
                >

                    <div className="modal-box w-11/12 max-w-5xl">

                        <h3 className="font-bold text-lg text-center !mb-5">
                            পাওনাদার যোগ করুন
                        </h3>


                        {/* IMPORTANT:
                            method="dialog" remove করা হয়েছে
                        */}

                        <form
                            onSubmit={handleSubmit}
                            className="w-full"
                        >

                            <div className="name flex flex-col gap-4">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={customer.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={customer.address}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile"
                                    value={customer.mobile}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    value={customer.amount}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />

                            </div>


                            <div className="buttons flex justify-between !mt-5">

                                <button
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("my_modal_4")
                                            .close()
                                    }
                                    className="btn bg-red-700 text-white w-[30%] md:w-[25%] lg:w-[20%]"
                                >
                                    বন্ধ করুন
                                </button>


                                <button
                                    type="submit"
                                    className="btn bg-green-800  text-white w-[30%] md:w-[25%] lg:w-[20%]"
                                >
                                    যোগ করুন
                                </button>

                            </div>

                        </form>

                    </div>

                </dialog>


                {/* Party List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 !mt-[50px]">

                    {parties.length < 1 ? (
                        <div className="text-red-600 text-center col-span-full !w-full !m-0 !p-0  font-semibold text-xl w-full">
                            কোনো পাওনাদার ব্যক্তি নেই
                        </div>
                    ) : (

                        parties.map((data) => {

                            return (
                                <div
                                    className="party shadow !gap-3 !p-[20px] rounded text-center bg-gray-200"
                                    key={data.mobile}
                                >

                                    <span className="text-xl">
                                        Name: {data.name}
                                    </span>

                                    <p>
                                        Address: {data.address}
                                    </p>

                                    <p>
                                        Mobile: {data.mobile}
                                    </p>

                                    <p className="text-semibold text-xl">
                                        Amount: {data.amount} Tk
                                    </p>

                                    <br />

                                    <button
                                        onClick={() => handleRemoveParty(data._id)}
                                        className="bg-red-800 text-white rounded !py-2 w-full cursor-pointer">
                                        Remove
                                    </button>
                                    <br />


                                    {/* <Pagination /> */}

                                </div>
                            );

                        })

                    )}

                </div>

            </div>

        </div>
    );
}