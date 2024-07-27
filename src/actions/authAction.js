import axios from "axios";

import { REGISTER_USER, LOGIN_USER, CHECK_AUTH, LOGOUT_USER } from "./types";
import { DEV_URL } from "../configuration/config";

export const registerUser = (name, email, password) => {
    return async (dispatch, getState) => {
        try{
            const { data } = await axios.post(`${DEV_URL}/api/users`,{
                name: name,
                email: email,
                password: password
            });

            let token = data.token;
            localStorage.setItem('token', token);

            dispatch({
                type: REGISTER_USER
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const loginUser = (email, password) => {
    return async (dispatch, getState) => {
        try{
            const { data } = await axios.post(`${DEV_URL}/api/auth`,{
                email: email,
                password: password
            });

            let token = data.token;
            localStorage.setItem('token', token);

            dispatch({
                type: LOGIN_USER
            });

        }catch (error){
            console.log(error);
        }
    }
}

export const checkIsAuthenticated = () => {
    return async (dispatch, getState) => {
        const isTokenExist = localStorage.getItem('token');

        if(isTokenExist){
            dispatch({
                type: CHECK_AUTH,
                payload: true
            });
        }else {
            dispatch({
                type: CHECK_AUTH,
                payload: false
            });
        }
    }
}

export const logoutUser = () => {
    return async (dispatch, getState) => {
        localStorage.removeItem('token');
        dispatch({
            type: LOGOUT_USER
        })
    }
}