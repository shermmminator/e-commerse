import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider,
         Button,
         Typography,
         Toolbar,
         Box,
         CssBaseline,
         AppBar,
         Badge } from "@mui/material";
import { Outlet } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { theme } from "./headerDesign";
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header({ isLoggedIn, localCartItems }) {

    const { isAuthenticated } = useSelector(state => state.users);
    const [hidePrivateIcons, setHidePrivateIcons] = useState(false);
    const navItemsLoggedIn = ["cart", "profile"];
    const navItemsLoggedOut = ["register", "login"];

    const userLoggedInMenu = (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
            {navItemsLoggedIn.map(e => {
                
                return (
                    <Button key={e} sx={{ color: '#fff' }}>
                        <Link to={`/${e}`} className="logged-in-tags">
                            {e === "cart" ? (
                                <Badge badgeContent={localCartItems.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            ) : (
                                <Badge>
                                    <AccountCircleIcon />
                                </Badge>
                            )}
                        </Link>
                    </Button>
                )

            })}
        </Box>
    );


    const userLoggedOutMenu = (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
            {navItemsLoggedOut.map(e => {
        
                return (
                    <Button key={e} sx={{ color: '#fff' }}>
                        <Link to={`/${e}`} className="logged-out-tags">
                            {e}
                        </Link>
                    </Button>
                )
            })}
        </Box>
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setHidePrivateIcons(!isAuthenticated);

        }, 100);

        return () => clearTimeout(timeoutId);

    }, [isLoggedIn]);

    return (
        <>
        <ThemeProvider theme={theme} >
        <Box sx={{ display: "flex", color: "white" }}>
            <CssBaseline /> 
            <AppBar component="nav" id="header-container">
                <Toolbar>
                    <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                    >
                    <Link className="homepage-link" to="/">
                    
                        GadgetDron 
                       
                    </Link>
                    </Typography>
                        {hidePrivateIcons ? userLoggedOutMenu : userLoggedInMenu }
                </Toolbar>
            </AppBar>
        </Box>
        </ThemeProvider>
        <Outlet/>
        </>
    )

};

export default Header;