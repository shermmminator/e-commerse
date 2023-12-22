import { createSlice } from "@reduxjs/toolkit";
import { userAuth, verifyLogin, startRegister } from "../../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogout } from "../../api/auth";

// This retrieves the user object on every re-mount of the App component after a successful login
export const checkIfLoggedIn = createAsyncThunk(
    "auth/verifyLogin",
    async(params, thunkAPI) => {
        try {
            // This call will hit the correct endpoint, that deserializes user and makes request to the database accordingly.
            // This works properly
            const result = await verifyLogin();
            
            if(!result) {
                throw new Error();
            }

            // If result returned something then return this promise
            return {
                user: result,
                cart: {},
                isAuthenticated: true
            };

        } catch(e) {
            console.log(e.message);
            throw e
        }
    }
)

// This runs on Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(params, thunkAPI) => {
        try {
            // This runs on user login
            const result = await userAuth(params);

            if(!result) {
                throw new Error();
            }

            return {
                user: result,
                cart: {},
                isAuthenticated: true
            }

        } catch(e) {
            console.log(e.message);
            throw e
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async(params, thunkAPI) => {

        try {
            const result = await userLogout();

            if(result === "Logout successful") {

                return {
                    user: null,
                    isAuthenticated: false
                }
            };

            return {
                loadError: true
            }

        } catch(e) {
            console.log(e.message);
            throw e
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(params, thunkAPI) => {
        try {

            const result = await startRegister(params);
            console.log("Result of the registerUser function is: " + result);

            if(result === "Email already registered") {
                console.log("first if runs")
                return {
                    emailAlreadyRegistered: true,
                    loadError: false,
                    userRegistered: false
                }
            }

            if(result === "User could not be created") {
                return {
                    loadError: true,
                    emailAlreadyRegistered: false,
                    userRegistered: false
                }
            }

            return {
                emailAlreadyRegistered: false,
                loadError: false,
                userRegistered: true
            }


        } catch(e) {
            console.log(e.message);
            throw e
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
        isAuthenticated: false,
        isFetching: false,
        loadError: false,
        emailAlreadyRegistered: false,
        userRegistered: false
    },
    reducers: {
        // loadUser: (state, action) => {
        //     Object.assign(state, action.payload)
        //     console.log(state.user)
        // }, 

        // toggleIsAuthenticated: (state, action) => {
        //     state.isAuthenticated = action.payload;
        //     state.isFetching = false;
        //     state.loadError = false;
        // },

        // toggleIsFetching: (state, action) => {
        //     state.isFetching = true
        // },

        // toggleLoadError: (state, action) => {
        //     state.loadError = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkIfLoggedIn.fulfilled, (state, action) => {
            const { isAuthenticated, user } = action.payload;
            Object.assign(state, { user: user });
            state.isAuthenticated = isAuthenticated;
            state.loadError = false;
        })
        .addCase(checkIfLoggedIn.rejected, (state, action)  => {
            state.loadError = true;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const { isAuthenticated, user } = action.payload;
            Object.assign(state, { user: user });
            state.isAuthenticated = isAuthenticated;
            state.loadError = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loadError = true;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            const { loadError, emailAlreadyRegistered, userRegistered } = action.payload;
            // console.log("Thunk fulfilled");
            state.loadError = loadError;
            state.emailAlreadyRegistered = emailAlreadyRegistered;
            state.userRegistered = userRegistered;
        })
        .addCase(registerUser.rejected, (state, action) => {
            // console.log("Thunk rejected");
            state.loadError = true;
            state.userRegistered = false;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            // const { isAuthenticated, user } = state.action;
            Object.assign(state, { user: {}, isAuthenticated: false });
            state.loadError = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loadError = true;
        })
    }

});

export const { toggleIsAuthenticated, toggleIsFetching, toggleLoadError, loadUser } = usersSlice.actions;
export default usersSlice.reducer;

export const fetchUserMiddleware = (data) => async(dispatch) => {
    try {
        
        
        const result = await userAuth(data);
        //console.log(user);

        if(typeof result === "object") {
            console.log({user: result})
            dispatch(loadUser({user: result}));
            dispatch(toggleIsAuthenticated(true));

        } else {
            dispatch(toggleLoadError(true));
        }

    } catch(e) {
        console.log(e.message);
        console.log("Error in the fetchUserMiddleware fucntion");
    }
}

export const fetchVerifyLoginMiddleware = () => async(dispatch) => {
    try {
        console.log("fetchVerifyLoginMiddleware run")
        const result = await verifyLogin();

        if(typeof result === "object") {
            console.log("User authenticated from cookie");
            dispatch(loadUser({user: result}));
            dispatch(toggleIsAuthenticated(true));

        } else {
            dispatch(toggleLoadError(true));

        }

    } catch(e) {
        console.log(e.message);
        console.log("Error in the fetchVerifyLoginMiddleware function");
    }
}