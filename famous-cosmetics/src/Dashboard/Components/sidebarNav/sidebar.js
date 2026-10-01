import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../../ProductContext/ProductsContext'
import logo from '../../../assets/images/logo (2).png'
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiGalleryView } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";




export default function Dsidebar() {
    const { products, loading } = useProducts();
    const [stock, setStock] = useState([])
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("লগআউট সফল হয়েছে!");

        navigate("/dashboard/login", {
            replace: true,
        });
    };




    useEffect(() => {
        const OutOfStock = products.filter((items) => {
            return items.stock < 100;
        });

        setStock(OutOfStock);
    }, [products]);



    const SidebarNavItems = [
        {
            id: 1,
            name: "ড্যাশবোর্ড",
            path: "/dashboard"
        },
        {
            id: 2,
            name: "সকল পণ্য",
            path: "/dashboard/All-Products"
        },
        {
            id: 3,
            name: "পণ্য আপলোড",
            path: "/dashboard/Upload-products"
        },
        {
            id: 4,
            name: "স্টক শেষ",
            path: "/dashboard/Stock-out"
        },
        {
            id: 5,
            name: "মেয়াদ শেষের পথে",
            path: "/dashboard/expired-products"
        },
        {
            id: 6,
            name: "পার্টির বকেয়া",
            path: "/dashboard/Party-due"
        },
    ];

    const ResponsiveSidebarNavItems = [
        {
            id: 1,
            name: "ড্যাশবোর্ড",
            icon: MdDashboard,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "সকল পণ্য",
            icon: RiGalleryView,
            path: "/dashboard/All-Products",
        },
        {
            id: 3,
            name: "পণ্য আপলোড",
            icon: FaUpload,
            path: "/dashboard/Upload-products",
        },
        {
            id: 4,
            name: "স্টক শেষ",
            icon: FaFileExcel,
            path: "/dashboard/Stock-out",
        },
        {
            id: 5,
            name: "মেয়াদ শেষের পথে",
            icon: BsFillCalendar2DateFill,
            path: "/dashboard/expired-products",
        },
        {
            id: 6,
            name: "পার্টির বকেয়া",
            icon: FaUser,
            path: "/dashboard/Party-due",
        },
    ];




    return (

        <div className="sideNabar_items  bg-plum w-[300px] h-full fixed top-0">
            <div className=" w-full justify-center  flex ">
                <Link to={"/"}>
                    <img src={logo} className='object-contain w-[50%] flex mx-auto ' alt="famous-logo" />
                </Link>
            </div>

            <div className="h-screen flex flex-col text-center justify-center">
                <div className="responsive-sidebar  !mt-[-150px]">
                    <div>
                        {ResponsiveSidebarNavItems.map((items) => {
                            const Icon = items.icon
                            return (
                                <li key={items.id} className="list-none flex text-center text-blush w-full border-b last:border-b-0">
                                    <NavLink
                                        to={items.path}
                                        end={items.path === "/dashboard"}
                                        title={items.name}
                                        className={({ isActive }) =>
                                            `block w-full px-6 font-semibold flex justify-center !py-3 transition-colors text-center text-gold  duration-200 ${isActive
                                                ? "bg-plum !text-white"
                                                : " hover:bg-magenta !hover:text-white"
                                            }`
                                        }
                                    >
                                        <Icon size={22} />
                                    </NavLink>
                                </li>
                            )
                        })
                        }
                    </div>
                    <button onClick={handleLogout}
                        className='bg-red-800 cursor-pointer w-[70%] text-[25px]  flex justify-center font-semibold text-center rounded hover:bg-red-600 !mx-auto !py-2 !mt-3 text-white'><IoLogOutOutline /></button>
                </div>
                <div className="desktop-sidebar !mt-[-150px]">
                    {SidebarNavItems.map((items) => (
                        <li key={items.id} className="list-none text-blush w-full border-b last:border-b-0">
                            <NavLink
                                to={items.path}
                                end={items.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `block w-full px-6 font-semibold !py-3 transition-colors text-center text-gold  duration-200 ${isActive
                                        ? "bg-plum !text-white"
                                        : " hover:bg-magenta !hover:text-white"
                                    }`
                                }
                            >
                                {items.name}
                            </NavLink>
                        </li>
                    ))}

                    <button onClick={handleLogout}
                        className='bg-red-800 cursor-pointer w-[70%] rounded hover:bg-red-600 !mx-auto !py-2 !mt-3 text-white'
                    >Log out</button>

                </div>
            </div>
        </div>

    )
}
