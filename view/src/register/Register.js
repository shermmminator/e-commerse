import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { registerUser } from "../store/user/slice";
import { useNavigate } from "react-router";
import Typography from '@mui/material/Typography';

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailInUse, setEmailInUse] = useState(false);
    const [isLoadError, setIsLoadError] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const { loadError, emailAlreadyRegistered, userRegistered } = useSelector(state => state.users);

    useEffect(() => {
        if(loadError) {
            setIsLoadError(loadError);
            
        } else {
            setIsLoadError(loadError);   
        }

        if(emailAlreadyRegistered) {
            setEmailInUse(emailAlreadyRegistered)

        } else {
            setEmailInUse(emailAlreadyRegistered)
        }

        if(userRegistered) {
            setIsRegistered(userRegistered)

        } else {
            setIsRegistered(userRegistered)
        } 

        console.log(emailInUse, isLoadError, isRegistered);

    }, [dispatch, loadError, isLoadError, isRegistered, emailInUse, emailAlreadyRegistered]);

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();

            if(!email || !password || !firstName || !lastName) {
                alert("Fill out every field!");
                return ""
            }

            await dispatch(registerUser({
                email,
                password,
                firstName,
                lastName
            }));

            console.log("user registered" + userRegistered);

            // if(userRegistered) {
            //     alert("User registration complete, proceed to login");
            //     navigate("/login");
            // }

        } catch(e) {
            console.log(e.message);
            console.log("Error in the handleSubmit function");
        }
    }

    return (

        <div className="register-container">
            <div className="register-inner-container">
                <div className="register-holder">
                    <Typography variant="h3" gutterBottom className="register-title">Register</Typography>
                    <form className="submit-container" onSubmit={handleSubmit}>
                        <div className="input-div one">
                            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-div">
                            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-div">
                            <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="input-div">
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="input-div button-div">
                            <Button type="submmit" variant="contained" id="register-button">Register</Button>
                        </div>
                    </form>
                    {isRegistered && <p className="response-status">User registered successfully</p>}
                    {emailInUse && <p className="response-status">This email was already registered</p>}
                </div>
            </div>
        </div>

    )
};

export default Register