import axios from "axios"
import { API_URL } from "../../helper"


export const loginAction = (username, password) => {
    return async (dispatch) => {
        try {
            let response = await axios.post(`${API_URL}/users/login`, {
                username, password
            })
            if (response.data.success) {
                console.log("ini data", response.data.dataLogin)
                localStorage.setItem("data", (response.data.dataLogin.token))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.dataLogin
                })
                return { success: response.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            // let local = localStorage.getItem("data")
            let token = localStorage.getItem("data")
            if (token) {
                // local = JSON.parse(local);
                let res = await axios.get(`${API_URL}/users/keep`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                }

                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const Register = (username, email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post((`${API_URL}/users/register`), {
                username,
                email,
                password
            })
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data.success
            })
            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }
}

export const verifyLogin = () => {
    return async (dispatch) => {
        try {
            let token = window.location.pathname.split('/')[2]
            console.log(token)
            if (token) {
                console.log('1', token)
                let res = await axios.get(`${API_URL}/users/verify`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataVerify.token)
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataVerify
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUserCart = (data, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${iduser}`, {
                cart: data
            })
            dispatch({
                type: "UPDATE_CART_USER",
                payload: res.data.cart
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutAction = () => {
    return {
        type: "LOGOUT"
    }
}