import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo (2).png'
import { FaBars } from "react-icons/fa";
import './Nav.css'
import { FaTimes } from "react-icons/fa";



export default function NavBar() {
    const [open, setopen] = useState(false)
    const NavItems = [
        { name: "হোম", path: "/" },
        { name: "সকল পণ্য", path: "/all-products" },
        { name: "একসেসোরিজ", path: "/accessories" },
        { name: "কসমেটিকস", path: "/cosmetics" }
    ]


    return (
        <nav className='nav-bar !bg-plum'>

            <div className="App-container navigation-bar  flex items-center justify-between">
                <div className="logo flex-shrink-0">
                    <Link to="/">
                        <img
                            src={logo}
                            className="w-[250px] sm:w-[180px]  h-auto object-contain"
                            alt="famous-logo"
                        />
                    </Link>
                </div>
                <div className="hidden lg:block xl:block 2xl:block flex items-center w-[40%] gap-3 sm:gap-6">
                    <div className="flex justify-between justify-between  w-full">
                        {NavItems.map((item, index) => (
                            <div key={index} className='nav-list flex justify-between'>
                                <NavLink to={item.path} className="text-gold">
                                    {item.name}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    open ? <div className="nav-items mobile flex items-center gap-3 sm:gap-6">
                        <div className="logo">
                            <Link to="/">
                                <img
                                    src={logo}
                                    className="w-[250px] sm:w-[180px]  h-auto object-contain"
                                    alt="famous-logo"
                                />
                            </Link>
                            <span className="text-white cross-bars text-md">
                                <FaTimes onClick={() => setopen(!open)} />
                            </span>
                        </div>
                        <div className="responsive flex justify-between justify-between  w-full">
                            {NavItems.map((item, index) => (
                                <div key={index} className='nav-list'>
                                    <NavLink to={item.path}>
                                        {item.name}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div> : ""
                }
            </div>
            <div className="bars-icons ">
                {!open ? (
                    <span className="text-white text-md">
                        <FaBars onClick={() => setopen(!open)} />
                    </span>
                ) : (
                    <span className="text-white text-md">
                        <FaTimes onClick={() => setopen(!open)} />
                    </span>
                )}
            </div>
        </nav>
    )
}
