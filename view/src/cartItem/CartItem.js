import React from "react";
import "./CartItem.css";
import { useState, useEffect } from "react"
import { Typography, Button, TextField, MenuItem } from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { deleteCartItem, modifyQuantity } from "../api/cartItems";
import { useDispatch } from "react-redux";
import { fetchCartItems, removeCartItem } from "../store/cartitems/slice";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { img1, img2 } from "../utils/img";

function CartItem({ cartItem, localUser }) {

    const dispatch = useDispatch();
    const { name, price, qty, cartItemId, productId } = cartItem;
    const [isEdited, setIsEdited] = useState(false);
    const [localQty, setLocalQty] = useState(0);

    const handleDelete = async(e) => {
        try {
            await deleteCartItem(cartItemId);
            await dispatch(fetchCartItems(localUser.id));
            // console.log("handleDelete button was clicked");
            window.location.reload();

        } catch(e) {
            console.log(e.message);
            console.log("Error in the handleDelete function");
        }
    }

    const handleQtyChange = async(e) => {
        try {
            e.preventDefault();
            
            if(localQty === 0) {
                alert("qty is null");
                return ""
            }
            
            await modifyQuantity(cartItemId, { qty: localQty });
            await dispatch(fetchCartItems(localUser.id));
            console.log("handleQtyChange button was clicked");
            window.location.reload();

        } catch(e) {
            console.log(e.message);
            console.log("Error in the handleQtyChange function");
        }
    }

    return (
        <div className="cartitem-container">
            
            <div className="cartitem-details">
                <div className="spec-holder name-spec-holder">
                    <Typography className="cartitem-name" variant="h6">
                        {name}
                    </Typography>
                    <img 
                    className="orderitem-image"
                    src={name === "Krogan Shotgun" ? img2 : img1}
                    style={{
                        width: "4vw",
                        height: "2vw",
                        borderRadius: "10px"
                    }}
                    />
                    
                </div>
                <div className="spec-holder">
                    <Typography variant="h6">
                        {qty}
                    </Typography>
                </div>
                <div className="spec-holder">
                    <Typography variant="h6">
                        {`${price}$`}
                    </Typography>
                </div>
            </div>
            <div className="cartitem-modifier-holder">
                {isEdited ? (
                    <>
                        <TextField
                            id="product-quantity-selector"
                            select
                            label="quantity"
                            defaultValue={0}
                            value={localQty}
                            onChange={(e) => setLocalQty(e.target.value)}
                            >
                                {[...Array(11).keys()].map(e => (
                                    <MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Button
                        id="apply-button"
                        variant="contained"
                        onClick={handleQtyChange}
                        >
                            <CheckCircleOutlineIcon />
                        </Button>
                        <Button
                        id="cancel-button"
                        variant="contained"
                        onClick={() => setIsEdited(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                        id="modify-button"
                        variant="contained"
                        startIcon={ <EditIcon /> }
                        onClick={() => setIsEdited(true)}
                        >
                            Modify
                        </Button>
                        <Button 
                        id="delete-button" 
                        variant="contained"
                        onClick={handleDelete}
                        >
                            <HighlightOffIcon />
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default CartItem