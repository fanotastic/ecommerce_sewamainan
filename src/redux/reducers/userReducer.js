const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DATA DARI ACTION PAYLOAD", action.payload)
            return {
                ...state,
                id: action.payload.iduser,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                status: action.payload.status
            }
        case "LOGOUT":
            return INITIAL_STATE
        case "REGISTER_SUCCESS":
            console.log("Register action payload", action.payload)
            return {...state, ...action.payload}
        case "UPDATE_CART_USER":
            return {...state, cart: action.payload}
        default:
            return state
    }
}