
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AllProductsPage from '../pages/AllProductsPage'
import AccessoriesPage from '../pages/AccessoriesPage'
import CosmeticsPage from '../pages/CosmeticsPage'
import Login from '../Dashboard/pages/Login'
import Dashboard from '../Dashboard/pages/Dashboard'
import Frontend from '../Layout/frontend'
import DashboardLayout from '../Layout/Dashboard'
import UploadProducts from '../Dashboard/Components/UploadProduct/UploadProducts'
import PartyDue from '../Dashboard/pages/PartyDue'
import AllProductDisplay from '../Dashboard/Components/allProducts/AllProductDisplay'
import ExpierdProduct from '../Dashboard/Components/ExpiredProducts/ExpierdProduct'
import StockOutProduct from '../Dashboard/pages/StockOUt'
import Registration from '../Dashboard/pages/Registration'
import AuthLayout from '../Layout/LoginLayout'
import ProtectedRoute from './protectedRoute'
// import DashboardLayout from '../Dashboard/Dashboard'


export default function Routing() {
    return (
        <>
            {/* Frotnend  */}
            <Routes>
                <Route path='/' element={<Frontend />}>
                    <Route index element={<HomePage />} />
                    <Route path={"/all-products"} element={<AllProductsPage />} />
                    <Route path={"/accessories"} element={<AccessoriesPage />} />
                    <Route path={"/cosmetics"} element={<CosmeticsPage />} />


                </Route>
                <Route path={"*"} element={<div>404 Not Found</div>} />




                {/* login */}
                <Route element={<AuthLayout />}>

                    <Route
                        path="/dashboard/login"
                        element={<Login />}
                    />

                    <Route
                        path="/dashboard/Registration"
                        element={<Registration />}
                    />

                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />

                        <Route
                            path="admin"
                            element={<Dashboard />}
                        />
                        <Route
                            path="All-Products"
                            element={<AllProductDisplay />}
                        />

                        <Route
                            path="Upload-products"
                            element={<UploadProducts />}
                        />

                        <Route
                            path="Stock-out"
                            element={<StockOutProduct />}
                        />

                        <Route
                            path="expired-products"
                            element={<ExpierdProduct />}
                        />

                        <Route
                            path="Party-due"
                            element={<PartyDue />}
                        />
                    </Route>
                </Route>

                <Route
                    path="/admin"
                    element={<Navigate to="/dashboard" replace />}
                />





            </Routes>

        </>

    )
}












// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Layouts
// import FrontendLayout from "../layouts/FrontendLayout";
// import DashboardLayout from "../layouts/DashboardLayout";

// // Frontend Pages
// import HomePage from "../pages/HomePage";
// import AllProductsPage from "../pages/AllProductsPage";
// import AccessoriesPage from "../pages/AccessoriesPage";
// import CosmeticsPage from "../pages/CosmeticsPage";
// import SingleProductPage from "../pages/SingleProductPage";
// import Login from "../pages/Login";

// // Dashboard Pages
// import DashboardHome from "../dashboard/pages/DashboardHome";
// import DashboardProducts from "../dashboard/pages/DashboardProducts";
// import AddProduct from "../dashboard/pages/AddProduct";
// import DashboardOrders from "../dashboard/pages/DashboardOrders";
// import DashboardSettings from "../dashboard/pages/DashboardSettings";

// const Routings = () => {
//     return (
//         <Routes>

//             {/* ======================
//                 FRONTEND ROUTES
//             ======================= */}

//             <Route path="/" element={<FrontendLayout />}>

//                 <Route index element={<HomePage />} />

//                 <Route
//                     path="all-products"
//                     element={<AllProductsPage />}
//                 />

//                 <Route
//                     path="accessories"
//                     element={<AccessoriesPage />}
//                 />

//                 <Route
//                     path="cosmetics"
//                     element={<CosmeticsPage />}
//                 />

//                 <Route
//                     path="single-product/:id"
//                     element={<SingleProductPage />}
//                 />

//             </Route>


//             {/* ======================
//                 AUTH
//             ======================= */}

//             <Route
//                 path="/login"
//                 element={<Login />}
//             />


//             {/* ======================
//                 DASHBOARD ROUTES
//             ======================= */}

//             <Route
//                 path="/dashboard"
//                 element={<DashboardLayout />}
//             >

//                 <Route
//                     index
//                     element={<DashboardHome />}
//                 />

//                 <Route
//                     path="products"
//                     element={<DashboardProducts />}
//                 />

//                 <Route
//                     path="products/add"
//                     element={<AddProduct />}
//                 />

//                 <Route
//                     path="orders"
//                     element={<DashboardOrders />}
//                 />

//                 <Route
//                     path="settings"
//                     element={<DashboardSettings />}
//                 />

//             </Route>


//             {/* ======================
//                 404
//             ======================= */}

//             <Route
//                 path="*"
//                 element={<div>404 Not Found</div>}
//             />

//         </Routes>
//     );
// };

// export default Routings;

// import React from "react";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//     return (
//         <div className="dashboard-layout">

//             {/* Sidebar */}
//             <aside>
//                 <h2>Dashboard</h2>

//                 <ul>
//                     <li>Overview</li>
//                     <li>Products</li>
//                     <li>Orders</li>
//                     <li>Settings</li>
//                 </ul>
//             </aside>


//             {/* Dashboard Content */}
//             <section className="dashboard-content">

//                 {/* Dashboard Navbar */}
//                 <header>
//                     <h3>Admin Dashboard</h3>
//                 </header>

//                 {/* Child Pages */}
//                 <Outlet />

//             </section>

//         </div>
//     );
// };

// export default DashboardLayout;