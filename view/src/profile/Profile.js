import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Profile.css"
import { useNavigate } from "react-router";
import { logoutUser } from "../store/user/slice";
import { Button, Typography, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { changePassword } from "../api/auth";
import OrderItem from "../orderItem/OrderItem";


function Profile({ isLoggedIn, localUser, localOrderItems }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isEdited, setIsEdited] = useState(false);

    const calcOrderTotal = () => {
        try {
            return localOrderItems.reduce((a, c) => a + c.qty * c.price, 0) + "$";

        } catch(e) {
            console.log(e.message);
        }
    };

    const calcItemQty = () => {
        try {
            return localOrderItems.reduce((a, c) => a + c.qty, 0);

        } catch(e) {
            console.log(e.message);
        }
    }

    const handleLogout = async(e) => {
        try {
            e.preventDefault();
            await dispatch(logoutUser());

        } catch(e) {
            console.log(e.message);
            console.log("Error in the handleLogout function");
        }
    };

    const handlePassChange = async(e) => {
        try {
            e.preventDefault();

            if(!password || !verifyPassword) {
                alert("Fill out every field");
                return ""
            }

            if(password !== verifyPassword) {
                alert("Verify typos");
                return ""
            }

            const result = await changePassword({ id: localUser.id, password });

            if(result === "Password edited succeessfully") {
                alert("Password edited succeessfully");
                await dispatch(logoutUser());
            }

        } catch(e) {
            console.log(e.message);
            console.log("Error in the handlePassChange function")
        }
    }

    useEffect(() => {
        // console.log("islogged in home component is: " + isLoggedIn);
        const timeoutId = setTimeout(() => {
            if(!isLoggedIn) {
                console.log("within the setTimeout");
                navigate("/login");
            }

        }, 100);
        // console.log("useEffect runs in the Profile components");

        return () => clearTimeout(timeoutId);

    }, [isLoggedIn, localUser])

    return (
        <>
            <section className="profile-container">
                <div className="profile-inner-container">
                    <div className="profile-holder">
                        <div className="profile-specs-container">
                            <div className="profile-image-container">
                                <AccountCircleIcon id="user-icon"/>
                                { Object.values(localUser).length > 0 && 
                                    <Typography variant="h5">{localUser.firstname} {localUser.lastname}</Typography>
                                }
                            </div>

                        </div>
                        <div className="password-edit-container">
                            <div className="password-edit-inner-container">
                            {isEdited ? (
                                <div className="password-edit-holder">
                                    <TextField 
                                    id="password-input" 
                                    variant="outlined" 
                                    label="new password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    autoComplete="current-password"
                                    />
                                    <TextField 
                                    id="password-input"
                                    variant="outlined" 
                                    label="verify password"
                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                    type="password"
                                    autoComplete="current-password"
                                    />
                                    <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "green",
                                        Height: "1vw"
                                    }}
                                    onClick={handlePassChange}
                                    
                                    >
                                        Save
                                    </Button>
                                    <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "red",
                                        Height: "1vw"
                                    }}
                                    onClick={() => setIsEdited(false)}
                                
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : <Button id="change-pass-button" variant="contained" onClick={() => setIsEdited(true)}>Change password</Button>}
                            </div>
                            <div className="logout-button-container">
                                <Button id="logout-button" variant="contained" onClick={handleLogout}>Logout</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="order-history-container">
                <div className="order-history-holder">
                    <div className="order-history-title-container"
                    >
                        <Typography 
                        id="order-history-title"
                        variant="h4"
                        style={{
                            marginLeft: "0vw",
                        }}
                        >
                            Order history
                        </Typography>
                    </div>
                    <div className="order-history-items">
                        <Typography variant="h5">Put orders here</Typography>
                        {localOrderItems.length > 0 && (
                            <>
                                {localOrderItems.map(orderItem => <OrderItem orderItem={orderItem} />)}
                                <div 
                                className="order-total-holder"
                                style={{
                                    display: "flex ",
                                    marginTop: "2vw"

                                }}
                                >   <div
                                    style={{
                                        width: "33.3%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    >
                                        <Typography 
                                        variant="h5" 
                                        style={{
                                            float: "right",
                                            fontStyle: "italic",
                                            fontWeight: "900"
                                        }}
                                        >
                                            Total:
                                        </Typography>
                                    </div>
                                    <div
                                    style={{
                                        width: "33.3%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    >
                                        <Typography 
                                        variant="h5" 
                                        style={{
                                            float: "right",
                                            fontStyle: "italic",
                                            fontWeight: "900"
                                        }}
                                        >
                                            {calcItemQty()}
                                        </Typography>
                                    </div>
                                    <div
                                    style={{
                                        width: "33.3%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    >
                                        <Typography 
                                        variant="h5" 
                                        style={{
                                            float: "right",
                                            fontStyle: "italic",
                                            fontWeight: "900"
                                        }}
                                        >
                                            {calcOrderTotal()}
                                        </Typography>
                                    </div>
                                </div>
                               
                            </>

                        )}
                    </div>
                </div>
            </section>
        </>
    )
};

export default Profile