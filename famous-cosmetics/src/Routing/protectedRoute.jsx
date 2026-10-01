import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem("token"));
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("pageshow", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("pageshow", checkAuth);
        };
    }, [location.pathname]);

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/dashboard/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;