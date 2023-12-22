import { useSelector } from "react-redux";
import { Route } from "react-router";
import { React } from "react";
import { Navigate, Outlet } from "react-router";
import { useState, useEffect } from "react";

function ProtectedRoute({children, ...rest}) {

    const { isAuthenticated } = useSelector(state => state.users);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    // const navigate = useNavigate();
    // console.log("ProtectedRoute component: " + isAuthenticated);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldRedirect(!isAuthenticated);
        }, 100)

        return () => clearTimeout(timeoutId);

    }, [isAuthenticated]);
    

    return shouldRedirect ? <Navigate to="/login"/> : <Outlet />
        
    



}

export default ProtectedRoute