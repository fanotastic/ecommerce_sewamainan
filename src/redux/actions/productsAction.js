import axios from "axios";
import { API_URL } from "../../helper";

export const getProductsAction = ( search ) => {
    return async (dispatch) => {
        try {
            let response;
            if(search) {
                response = await axios.get(`${API_URL}/products?nama=${search}`)
            }
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data
            })
        } catch (error) {
            
        }
    }
}