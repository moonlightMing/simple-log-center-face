import { combineReducers } from 'redux-immutable';
import logWindowReducer from './logWindow/reducer';
import hostTreeReducer from './hostTree/reducer';
import { connectRouter } from 'connected-react-router/immutable';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    logWindow: logWindowReducer,
    hostTree: hostTreeReducer
})

export default createRootReducer;