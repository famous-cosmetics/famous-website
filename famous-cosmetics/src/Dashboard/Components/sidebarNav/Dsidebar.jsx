import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo (2).png";

import { IoLogOutOutline } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import { RiGalleryView } from "react-icons/ri";
import { FaUpload, FaFileExcel, FaUser } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Dsidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("লগআউট সফল হয়েছে!");
        onClose();

        navigate("/dashboard/login", {
            replace: true,
        });
    };

    const SidebarNavItems = [
        {
            id: 1,
            name: "ড্যাশবোর্ড",
            icon: FaCalculator,
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
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-screen w-[280px] flex-col
                    overflow-y-auto bg-plum
                    transition-transform duration-300 ease-in-out
                    md:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Logo */}
                <div className="flex w-full shrink-0 justify-center py-5">
                    <Link to="/" onClick={onClose}>
                        <img
                            src={logo}
                            alt="Famous Cosmetics"
                            className="mx-auto w-[150px] max-w-full object-contain"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex-1">
                    <ul className="m-0 list-none p-0">
                        {SidebarNavItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={item.id}
                                    className="border-b border-white/10 last:border-b-0"
                                >
                                    <NavLink
                                        to={item.path}
                                        end={item.path === "/dashboard"}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `flex w-full items-center !gap-4 !px-6 !py-4
                                            font-semibold text-gold transition-colors
                                            ${isActive
                                                ? "bg-magenta text-white"
                                                : "hover:bg-magenta hover:text-white"
                                            }`
                                        }
                                    >
                                        <Icon size={22} />
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="shrink-0 p-5">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center !mb-8 !gap-2
                        rounded bg-red-800 !py-3 font-semibold text-white
                        transition-colors hover:bg-red-600"
                    >
                        <IoLogOutOutline size={22} />
                        Log out
                    </button>
                </div>
            </aside>
        </>
    );
}