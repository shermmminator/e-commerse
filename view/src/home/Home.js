import React from "react";
import { useEffect, useState } from "react";
import Product from "../products/Product";
import "./Home.css";
import { fetchProducts } from "../store/products/slice";
import { useSelector, useDispatch } from "react-redux";

function Home({ isLoggedin, localUser }) {

    const n = 8;
    const myArr = Array(n).fill(0);
    const dispatch = useDispatch();
    const [productsArr, setProductsArr] = useState([]);
    const { products, productsAreLoaded } = useSelector(state => state.products);
    const [forceRender, setForceRender] = useState(false)
    // Extract the of the cart that belongs to the logged in user:
    const { cartId } = localUser;

    useEffect(() => {
        console.log("products are" + products[0]);
        setProductsArr(products);
        console.log("useEffect runs: ");
        console.log("Local value of productsArr is: " + productsArr);

    }, [dispatch, productsAreLoaded, productsArr]);

    useEffect(() => {
        async function getAllProducts() {
            try {
                await dispatch(fetchProducts());
                // console.log(products);

            } catch(e) {
                console.log("Error in the useEffect function: ");
                console.log(e.message);
            }

        }

        getAllProducts();

}, []);

    return (
        <div className="home-container">
            <div className="home-inner-container">
                {
                    productsArr.map(e => {
                        return <Product 
                                element={e} 
                                isLoggedin={isLoggedin} 
                                localUser={localUser} 
                                forceRender={forceRender}
                                setForceRender={setForceRender}
                                />
                    })
                }
            </div>
        </div>
    );
};

export default Home