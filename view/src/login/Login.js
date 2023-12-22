import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/user/slice";
import { useNavigate } from "react-router-dom";
import { fetchUserMiddleware } from "../store/user/slice";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "./Login.css";

// Login component the child component of App
function Login({ isLoggedIn }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, loadError, user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(isLoggedIn);

    useEffect(() => {
        console.log("isLoggedin in Login component: " + isLoggedIn);
        if(isLoggedIn) {
            navigate("/")
        }

    }, [isLoggedIn]);


    // handleSubmit is triggered when form is submitted
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            // This should update the redux store's state to isAuthenticated = true. This works correctly.
            setIsLoading(true);

            await dispatch(loginUser({ username: email, password: password }));

            setIsLoading(false);

            // if(isAuthenticated) {
            //     navigate("/")
            // }

        } catch(e) {
            console.log(e.message);
            setIsLoading(false);
        }
        
    }

    return (
        <div className="login-container">
            <div className="login-container-inner">
                <form onSubmit={handleSubmit}>
                    <div className="login-holder">
                        <Typography variant="h3" gutterBottom className="register-title">Login</Typography>
                        <div className="input-holder">
                            <div className="input-holder-inner">
                                <TextField 
                                label="Email"
                                variant="outlined"
                                id="outlined-basic" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-holder-inner">
                                <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                autoComplete="current-password"
                                id="outlined-basic"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="submit-holder">
                                <p>Don't have an account yet? <Link to="/register">Register here!</Link></p>
                                <Button id="login-button" type="submit" variant="contained">Login</Button>
                                {/*isAuthenticated && <p>User is authenticated</p>*/}
                            </div>
                        </div>
                                {loadError && <p className="notify-text">User credentials incorrect</p>}
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login