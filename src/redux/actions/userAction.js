import axios from "axios"
import { API_URL } from "../../helper"


export const loginAction = (username, password) => {
    return async (dispatch) => {
        try {
            let response = await axios.get(`${API_URL}/users?username=${username}&password=${password}`)
            if (response.data.length > 0) {
                console.log("ini data", response.data[0])
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return { success: true }
            }
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