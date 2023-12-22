import React from "react"
import "./Cart.css"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchCartItems } from "../store/cartitems/slice";
import { Typography, Button } from "@mui/material";
import { placeOrder } from "../api/order";
// Custom components section
import CartItem from "../cartItem/CartItem";
import NotifyModal from "../modal/notifyModal";
//

function Cart({ isLoggedIn, localUser, localCartItems }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    }

    const calcTotal = () => {
        try {
            return localCartItems.reduce((a, c) => a + c.qty * c.price, 0);
            
        } catch(e) {
            console.log(e.message);
            console.log("Error in the calcTotal function");
        }
    }

    const handlePlaceOrder = async(e) => {
        try {
            e.preventDefault();

            const temptTotal = await calcTotal();

            const result = await placeOrder({
                id: localUser.id,
                total: temptTotal,
                items: localCartItems
            });

            if(result) {
                // alert("Order was placed successfully");
                dispatch(fetchCartItems(localUser.id));
                openModal();
                // window.location.reload();
            }

            if(!result) {
                alert("Order could not be placed");
            }


        } catch(e) {
            console.log(e.message);
            console.log("Error in the handlePlaceOrder function");
        }
    }
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(!isLoggedIn) {
                navigate("/login");
            }

        }, 100)

        return () => clearTimeout(timeoutId);

    }, [isLoggedIn])

    return (

        <div className="cart-container">
            <NotifyModal isOpen={isModalOpen} onClose={closeModal} />
            <div className="cart-inner-container">
                {localCartItems.length > 0 ? (
                    <div className="cartitem-container-superior">  
                        <div className="cartitem-title-holder">
                            <div className="cartitem-title-holder-inner">
                                <Typography id="cart-title" variant="h6">
                                    Name:
                                </Typography>
                            </div>
                            <div className="cartitem-title-holder-inner">
                                <Typography id="cart-title" variant="h6">
                                    Quantity:
                                </Typography>
                            </div>
                            <div className="cartitem-title-holder-inner">
                                <Typography id="cart-title"variant="h6">
                                    Price:
                                </Typography>
                            </div>
                        </div>
                        {localCartItems.map((cartItem) => <CartItem 
                                                        cartItem={cartItem} 
                                                        localUser={localUser} 
                                                        />
                        )}
                        <div className="cart-total-superior">
                            <div className="cart-total-holder">
                                <div className="cart-total-inner-holder">
                                    <Typography variant="h6" id="cart-total-title">Total:</Typography>
                                </div>
                                <div className="cart-total-inner-holder">
                                    <Typography variant="h6" id="cart-total">{`${calcTotal()}$`}</Typography>
                                </div>
                            </div>
                            <div className="cart-place-order-holder">
                                <Button 
                                id="place-order-button"
                                variant="contained"
                                onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : <Typography variant="h3" id="cart-is-empty-title">No items in the cart</Typography>}
            </div>
        </div>
    )
}

export default Cart