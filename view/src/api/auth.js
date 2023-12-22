import axios from 'axios';
import API from './client';

export const userAuth = async(data) => {
    // const { email, password } = data;
    try {
        const response = await API.post(`auth/login`, data);
        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("Error in the userAuth function");
        return false
    }
};

export const userLogout = async() => {
    try {
        const response = await API.post(`auth/logout`);
        return response.data;

    } catch(e) {
        console.log("Error in the userLogout function");
        console.log(e.message);

    }
}

export const verifyLogin = async() => {
    try {   
        // console.log("Sending request to the /verify_login endpoint");
        const response = await API.get(`auth/verify_login`);
        return response.data

    } catch(e) {
        console.log(e.message);
        return false

    }
}

export const startRegister = async(data) => {
    try {
        const response = await API.post(`auth/register`, data)
        // console.log(response.data);
        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("Error in the startRegister function");
        return false
    }
};

export const changePassword = async(data) => {
    try {
        const response = await API.put(`auth/changePass`, data);
        return response.data

    } catch(e) {
        console.log(e.message);
        console.log("Error in the changePassword function");

    }
}