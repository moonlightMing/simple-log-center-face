import { combineReducers } from 'redux';
import logWindowReducer from './window/reducer';

export default combineReducers({
    logWindow: logWindowReducer
})