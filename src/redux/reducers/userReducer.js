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
            return {...state, ...action.payload}
        case "LOGOUT":
            return INITIAL_STATE
        case "REGISTER_SUCCESS":
            console.log("Register action payload", action.payload)
            return {...state, ...action.payload}
        default:
            return state
    }
}