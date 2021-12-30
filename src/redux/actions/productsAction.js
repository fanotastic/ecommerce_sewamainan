import axios from "axios";
import { API_URL } from "../../helper";

export const getProductsAction = () => {
    return async (dispatch) => {
        try {
            let response;
            response = await axios.get(`${API_URL}/products`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data
            })
        } catch (error) {
            
        }
    }
}