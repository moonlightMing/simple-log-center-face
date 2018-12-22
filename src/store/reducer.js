import { combineReducers } from 'redux-immutable';
import logWindowReducer from './logWindow/reducer';
import hostTreeReducer from './hostTree/reducer'

export default combineReducers({
    logWindow: logWindowReducer,
    hostTree: hostTreeReducer
})