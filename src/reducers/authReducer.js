import { REGISTER_USER, LOGIN_USER, CHECK_AUTH, LOGOUT_USER } from "../actions/types";

const initState = {
    isAuth: false
};

const alertReducer = (state = initState,action) => {
    switch (action.type){
        case REGISTER_USER:
            return {
                ...state,
                isAuth: true
            }
        case LOGIN_USER:
            return {
                ...state,
                isAuth: true
            }
        case CHECK_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false
            }
        default:
            return state;
    }
}

export default alertReducer;