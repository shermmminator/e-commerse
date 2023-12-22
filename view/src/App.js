import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
// import custom components
  import Login from './login/Login';
  import Header from './header/Header';
  import Cart from './cart/Cart';
  import Home from './home/Home';
  import ProductDetails from './productDetails/productDetails';
  import Register from './register/Register';
  import Profile from './profile/Profile';
//
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkIfLoggedIn } from './store/user/slice';
import { fetchCartItems } from './store/cartitems/slice';
import { loadOrderItems } from './store/orders/slice';
import { useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user, loadError } = useSelector(state => state.users);
  const { items } = useSelector(state => state.orders);
  // cartItems after dispatch
  const { cartItems } = useSelector(state => state.cartItems);
  // set content of user in the redux store to this local variable 
  const [localUser, setLocalUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [localOrderItems, setLocalOrderItems] = useState([]);
  
  useEffect(() => {
        
    setIsLoggedIn(isAuthenticated);
    
    if(Object.keys(user).length > 0) {
      setLocalUser(user);
      // console.log("Value of the localUser is " + localUser);
    }
    
    if(cartItems.length > 0) {
      // console.log(cartItems);
      setLocalCartItems(cartItems);
      // console.log("value of localCartItems in the App component is: " + localCartItems);
    }
    // console.log("isLoggedIn in App is " + isLoggedIn);
    // console.log("localUser email in App is :" + localUser.email);
  }, [dispatch, isAuthenticated, user, localUser, isLoggedIn, cartItems, localCartItems]);

  useEffect(() => {
    
    async function isLoggedin() {
      try { 
        await dispatch(checkIfLoggedIn())
        
      } catch(e) {
        console.log("Error");
        console.log(e.message);
      } 
    }

    isLoggedin()
    
  }, []);

  useEffect(() => {
    if(Object.keys(localUser).length > 0) {
      async function retrieveCartItemsAndOrders() {
        await dispatch(fetchCartItems(localUser.id));
        await dispatch(loadOrderItems(localUser.id));
      }
      retrieveCartItemsAndOrders()
    }
    
  }, [localUser]);

  useEffect(() => {
    if(items.length > 0) {
      // console.log(items);
      setLocalOrderItems(items);
      console.log(localOrderItems)
    }

  }, [items]);

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Header isLoggedIn={isLoggedIn} localUser={localUser} localCartItems={localCartItems} />}> 
            <Route path='' element={ <Home isLoggedIn={isLoggedIn} localUser={localUser} /> }></Route>
            <Route path='register' element={ <Register /> }></Route>
            <Route path='login' element={ <Login isLoggedIn={isLoggedIn} /> }></Route>
            <Route path='cart' element={<Cart isLoggedIn={isLoggedIn} localUser={localUser} localCartItems={localCartItems} />} ></Route>
            <Route path='profile' element={<Profile isLoggedIn={isLoggedIn} localUser={localUser} localOrderItems={localOrderItems}/>}></Route>
            <Route path='products/:productId' element={ <ProductDetails isLoggedIn={isLoggedIn} localUser={localUser} /> }></Route>
          </Route>
      </Routes>
    </BrowserRouter>

  )
};

export default App;
