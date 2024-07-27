import { combineReducers } from 'redux';

import alertReducer from "./alertReducer";
import developerReducer from "./developerReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    alert: alertReducer,
    developer: developerReducer,
    post: postReducer,
    auth: authReducer
});

export default rootReducer;