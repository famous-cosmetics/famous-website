import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import Dsidebar from "../Dashboard/Components/sidebarNav/Dsidebar";
import { ProductsProvider } from "../Dashboard/ProductContext/ProductsContext";
// import logo from '../../../assets/images/logo (2).png'
import logo from "../assets/images/logo (2).png";








export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProductsProvider>
            <div className="min-h-screen w-full !m-0 !p-0">

                <Dsidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Dashboard Main Area */}
                <main className="!m-0 !p-0 min-h-screen min-w-0 w-full md:!ml-[280px] md:!w-auto">

                    {/* Mobile Header */}
                    <header className="sticky top-0 z-1 flex items-center gap-3 border-b bg-white !px-4 !py-3 md:hidden">

                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            aria-label="Toggle sidebar"
                            className="!p-2 text-2xl text-gray-800"
                        >
                            {isSidebarOpen ? <IoClose /> : <IoMenu />}
                        </button>

                        <div className="flex !h-[70px] !w-full !m-0 !p-0 items-center justify-center ">
                            <img
                                src={logo}
                                alt="famous-cosmetics"
                                className="!h-full !w-[150px] !m-0 !p-0 object-contain"
                            />
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="dashboard-content !m-0 !w-full !max-w-none  sm:!px-3 md:!px-4 !py-4">
                        <Outlet />
                    </div>

                </main>
            </div>
        </ProductsProvider>
    );
}