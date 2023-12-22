import "./productDetails.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchProduct } from "../store/products/slice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import NumberInputIntroduction from "../products/numberInput";
import { fetchCartItems } from "../store/cartitems/slice";
import { TextField, MenuItem } from "@mui/material";
import { insertCartItem } from "../api/cartItems";
import { img1, img2 } from "../utils/img";

function ProductDetails({ isLoggedIn, localUser, localProduct }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(0);
    const { productId } = useParams();

    const handleQuantityChange = (e) => {
        e.preventDefault();
        setQty(e.target.value);
    };

    const handlePlaceInCart = async(e) => {
        try {
            e.preventDefault();
    
            if(Object.keys(localUser).length === 0) {
                console.log("localUser object is empty");
                navigate("/login");
                return ""
            }

            if(!productId) {
                console.log("No productId found");
            }
    
            if(qty === 0) {
                alert("Quantity must be greater than 0");
                return ""
            }
            
            await insertCartItem({ id: localUser.id, data: { id: productId, qty } });
            await dispatch(fetchCartItems(localUser.id));

        } catch(e) {
            console.log("error in handlePlaceInCart");
            console.log(e.message);
        }
    }

    useEffect(() => {
        async function loadProduct() {
            try {
                await dispatch(fetchProduct(productId));

            } catch(e) {
                console.log(e.message);
                console.log("Error in the loadProduct funcitn within useEffect");
            }
        };

        loadProduct();
    }, []);

    return (
        <div className="product-details-container">
            <div className="product-details-inner-container">
                
                {localProduct.length > 0 && (
                    <div className="product-details-holder">
                        <div className="product-image-holder">
                            <img 
                            src={localProduct[0].name === "Krogan Shotgun" ? img2 : img1}
                            style={{
                                width: "100%",
                                borderRadius: "10px"
                            }}
                            />
                        </div>    
                        <div className="product-text-holder">
                            <div className="product-title-holder">
                                <h2>{localProduct[0].name}</h2>
                                <h4>{`${localProduct[0].price}$`}</h4>
                            </div>

                            <div className="product-description-holder">
                                <p>{localProduct[0].description}</p>
                            </div>

                            <div className="execute-order-holder">
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
                                <Button variant="contained" onClick={handlePlaceInCart}>ADD TO CART</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails;