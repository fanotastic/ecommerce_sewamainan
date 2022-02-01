import axios from "axios";
import { API_URL } from "../../helper";

export const getProductsAction = ( search ) => {
    return async (dispatch) => {
        try {
            let response;
            if(search) {
                if(search.name) {
                    if (search.priceMax > 0 && search.priceMin > 0) {
                        response = await axios.get(`${API_URL}/products/?price_min=${search.priceMin}&price_max=${search.priceMax}&name=${search.name}`)
                    } else {
                        console.log('nama', search.name)
                        response = await axios.get(`${API_URL}/products/?name=${search.name}`)
                    }
                } else {
                    console.log('cek')
                    response = await axios.get(`${API_URL}/products/?price_min=${search.priceMin}&price_max=${search.priceMax}`)
                }
            } else {
                console.log('product')
                response = await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: response.data.dataProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const getProductsSort = (sort) => {
    return async (dispatch) => {
        try {
            console.log('sort', sort.field, sort.sortType)
            let res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)

            dispatch({
                type: 'GET_DATA_PRODUCTS',
                payload: res.data.dataProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getProductsCategory = (category) => {
    return async (dispatch) => {
        try {
            console.log('cat', category)
            let res = await axios.get (`${API_URL}/products?category=${category}`)

            dispatch({
                type: 'GET_DATA_PRODUCTS',
                payload: res.data.dataProducts
            })
        } catch (error) {
            console.log(error)
        }
    }
}