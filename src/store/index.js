import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import createRootReducer from './reducer';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

const initialState = Immutable.Map()
export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export default store;