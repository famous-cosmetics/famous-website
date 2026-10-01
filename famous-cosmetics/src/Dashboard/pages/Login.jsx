import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";
import { FaRegEye , FaEyeSlash } from "react-icons/fa";



const Login = () => {
    const navigate = useNavigate();
    const [showPass, hidePass] = useState(false)
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();



        if (!mobile.trim() || !password) {
            toast.error("মোবাইল নম্বর ও পাসওয়ার্ড দিন");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/login/Admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    data.message || "লগইন ব্যর্থ হয়েছে"
                );
                return;
            }

            // Backend থেকে token আসতে হবে
            if (!data.token) {
                toast.error(
                    "সার্ভার থেকে লগইন টোকেন পাওয়া যায়নি"
                );
                return;
            }

            // Token সংরক্ষণ
            localStorage.setItem("token", data.token);

            // User information সংরক্ষণ
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            toast.success("লগইন সফল হয়েছে!");

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {
            console.error("Login Error:", error);
            toast.error("সার্ভারের সাথে সংযোগ করা যাচ্ছে না");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container w-[100%] sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[60]">
            <div className="login-box">

                <h2>স্বাগতম</h2>

                <p>আপনার অ্যাকাউন্টে লগইন করুন</p>

                <form onSubmit={handleLogin}>

                    {/* Mobile Number */}
                    <div className="input-group">

                        <label htmlFor="mobile">
                            মোবাইল নম্বর
                        </label>

                        <input
                            id="mobile"
                            type="tel"
                            placeholder="আপনার মোবাইল নম্বর লিখুন"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
                            }
                            autoComplete="tel"
                            required
                        />

                    </div>

                    {/* Password */}
                    <div className="input-group relative ">

                        <label htmlFor="password">
                            পাসওয়ার্ড
                        </label>

                        <input
                        className="relative "
                            id="password"
                            type={`${showPass ? "text" : "password"}`}
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                        <div className="eye-icon text-[24px] cursor-pointer  absolute right-2 top-11" onClick={()=>hidePass(!showPass)}>
                            {
                              !showPass?<FaRegEye className="eyes " />  :<FaEyeSlash className="eyes" />
                                
                    } </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "লগইন হচ্ছে..."
                            : "লগইন করুন"
                        }
                    </button>

                </form>

                {/* Registration */}
                <p className="register-text">
                    আপনার কি কোনো অ্যাকাউন্ট নেই?{" "}

                    <Link to="/dashboard/Registration">
                        অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;