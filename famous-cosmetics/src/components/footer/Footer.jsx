import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import logo from '../../assets/images/logo (2).png'

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-plum text-white w-full !py-10 !mt-[50px]">

            {/* Main Footer */}
            <div className="container flex items-center justify-center !mx-auto !px-5 !py-12">

                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-10 !mx-auto !p-5">

                    {/* Brand */}
                    <div className="mt-[-15px]!">
                        <Link to="/" className="">
                            <img
                                src={logo}
                                className="w-[220px] object-contain !h-[60px] sm:w-[180px]"
                                alt="famous-logo"
                            />
                        </Link>

                        <p className="text-gray-500 leading-5 !py-5">
                            পাইকারি দামে মানসম্মত Cosmetics,
                            Beauty Products ও Accessories।
                            ব্যবসার জন্য প্রয়োজনীয় পণ্য
                            সহজেই অর্ডার করুন।
                        </p>

                        {/* Social */}
                        <div className="flex gap-3 mt-6">

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition"
                            >
                                <FaWhatsapp />
                            </a>

                        </div>
                    </div>


                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg text-gold font-semibold !mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-500 !leading-6">

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/all-products"
                                    className="hover:text-white transition"
                                >
                                    All Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/cosmetics"
                                    className="hover:text-white transition"
                                >
                                    Cosmetics
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/accessories"
                                    className="hover:text-white transition"
                                >
                                    Accessories
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard"
                                    className="hover:text-white transition"
                                >
                                    Admin Dashboard
                                </Link>
                            </li>

                        </ul>
                    </div>


                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg text-gold font-semibold !mb-5">
                            Customer Service
                        </h3>

                        <ul className="space-y-3 text-gray-500 !leading-6">

                            <li>
                                <Link
                                    to="/wholesale"
                                    className="hover:text-white transition"
                                >
                                    Wholesale Order
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/delivery"
                                    className="hover:text-white transition"
                                >
                                    Delivery Information
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/return-policy"
                                    className="hover:text-white transition"
                                >
                                    Return Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/terms"
                                    className="hover:text-white transition"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>

                        </ul>
                    </div>


                    {/* Contact */}
                    <div>
                        <h3 className="text-lg text-gold font-semibold !mb-5">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-gray-500 !leading-6">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-lg" />

                                <p>
                                    ভিতর বাজার,
                                    <br />
                                    Feni, Bangladesh
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt />

                                <a
                                    href="tel:+8801867439902"
                                    className="hover:text-white"
                                >
                                    01867439902
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaWhatsapp />

                                <a
                                    href="https://wa.me/8801XXXXXXXXX"
                                    className="hover:text-white"
                                >
                                    WhatsApp
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope />

                                <a
                                    href="mailto:info@famouscosmetics.com"
                                    className="hover:text-white"
                                >
                                    info@famouscosmetics.com
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <br />
            {/* Copyright */}
            <div className="border-t  border-wwhite w-full !p-5">

                <div className="container !mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">

                    <p className="text-sm text-gray-500">
                        © 2026 Famous Cosmetics. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Wholesale Cosmetics & Accessories
                    </p>

                </div>

            </div>

        </footer>
    );
}