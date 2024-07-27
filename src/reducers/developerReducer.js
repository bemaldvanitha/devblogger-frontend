import { FETCH_ALL_USERS, FETCH_SINGLE_USER, FETCH_PROFILE_USER, ADD_EXPERINCE, ADD_EDUCATION, UPDATE_PROFILE,
    DELETE_EXPERINCE, DELETE_EDUCATION, FETCH_USER } from "../actions/types";

const initialState = {
    developers: [],
    selectedDeveloper: {},
    userDeveloper: {},
    user: {}
}

const developerReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_ALL_USERS:
            return {
                ...state,
                developers: action.payload
            }
        case FETCH_SINGLE_USER:
            return {
                ...state,
                selectedDeveloper: action.payload
            }
        case FETCH_PROFILE_USER:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case ADD_EXPERINCE:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case ADD_EDUCATION:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case DELETE_EXPERINCE:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case DELETE_EDUCATION:
            return {
                ...state,
                userDeveloper: action.payload
            }
        case FETCH_USER:
            return {
                ...state,
                user: action.payload
            }
    }
    return state;
}

export default developerReducer;