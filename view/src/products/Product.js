import { useState, useEffect } from "react";
import "./Product.css";
import { Button } from "@mui/material";
import NumberInputIntroduction from "./numberInput";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import { insertCartItem } from "../api/cartItems";
import { fetchCartItems } from "../store/cartitems/slice";
import { useDispatch } from "react-redux";
import { img1, img2 } from "../utils/img";

function Product({ element, isLoggedIn, localUser }) {

    const [qty, setQty] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        e.preventDefault();
        setQty(e.target.value);
    };

    const handlePlaceInCart = async() => {
        // e.preventDefault();
        
        if(Object.keys(localUser).length === 0) {
            // console.log("Before insertCartItem");
            navigate("/login");
            return ""
        }
        
        if(!localUser.id || !element.id || !qty) {
            console.log("One of the values is undefined");
            console.log(localUser.id, element.id, qty);
            return ""
        }

        if(qty === 0) {
            alert("Quantity must be greater than 0");
            return ""
        }
        // console.log("handleQuantityChange");
        await insertCartItem({ id: localUser.id, data: { id: element.id, qty } });

        await dispatch(fetchCartItems(localUser.id));
    }

    return (
        <div className="product-container">
            <NavLink className="product-navlink" to={`/products/${element.id}`}>
                <div className="product-img-container">
                    <div className="product-img-holder">
                        <img 
                        className="product-picture"
                        src={element.name === "Krogan Shotgun" ? img2 : img1}
                        />
                        
                    </div>
                </div>
            </NavLink>
                <div className="product-details-container">
                    <div className="product-title-container">
                        <h4>{ element.name }</h4>
                        <h5>{`${element.price}$`}</h5>
                    </div>
                    <div className="product-quantity-container">
                        <div>
                            <TextField
                            id="product-quantity-selecttor"
                            select
                            label="quantity"
                            defaultValue={0}
                            helperText="Select product quantity"
                            value={qty}
                            onChange={handleQuantityChange}
                            >
                                {[...Array(11).keys()].map(e => (
                                    <MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </div>
                        <div>
                            <Button variant="contained" onClick={handlePlaceInCart}>Add to cart</Button>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default Product