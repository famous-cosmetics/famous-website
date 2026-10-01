import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../config/apiConfig";

const Registration = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (loading) return;

        const userName = name.trim();
        const userMobile = mobile.trim();

        if (
            !userName ||
            !userMobile ||
            !password ||
            !confirmPassword
        ) {
            toast.error("সবগুলো তথ্য পূরণ করুন");
            return;
        }

        if (userName.length < 2) {
            toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
            return;
        }

        // বাংলাদেশি মোবাইল নম্বর validation
        const mobileRegex = /^01[3-9]\d{8}$/;

        if (!mobileRegex.test(userMobile)) {
            toast.error("সঠিক মোবাইল নম্বর লিখুন");
            return;
        }

        if (password.length < 6) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটো একই নয়");
            return;
        }

        try {
            setLoading(true);

            const registrationData = {
                name: userName,
                mobile: userMobile,
                password: password,
            };

            console.log("Registration Data:", registrationData);

            const response = await fetch(
                `${API_URL}/create/Admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
                );
                return;
            }

            toast.success("রেজিস্ট্রেশন সফল হয়েছে!");


            setName("");
            setMobile("");
            setPassword("");
            setConfirmPassword("");


            navigate("/dashboard/login", {
                replace: true,
            });

        } catch (error) {
            console.error("Registration Error:", error);
            toast.error("সার্ভারের সাথে সংযোগ করা যাচ্ছে না");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2 className="text-2xl text-center !my-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h2>

                <p>
                    আপনার নতুন অ্যাকাউন্ট তৈরি করুন
                </p>

                <form onSubmit={handleRegister}>

                    {/* নাম */}
                    <div className="input-group">
                        <label htmlFor="name">
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="আপনার নাম লিখুন"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            autoComplete="name"
                            required
                        />
                    </div>

                    {/* মোবাইল নম্বর */}
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
                            inputMode="numeric"
                            maxLength="11"
                            required
                        />
                    </div>

                    {/* পাসওয়ার্ড */}
                    <div className="input-group">
                        <label htmlFor="password">
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {/* পাসওয়ার্ড পুনরায় */}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">
                            পাসওয়ার্ড পুনরায় লিখুন
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="পাসওয়ার্ডটি আবার লিখুন"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "অ্যাকাউন্ট তৈরি করুন"
                        }
                    </button>

                </form>

                {/* Login */}
                <p className="register-text">
                    অ্যাকাউন্ট আছে?{" "}

                    <Link to="/dashboard/login">
                        লগইন করুন
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Registration;