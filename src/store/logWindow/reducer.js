import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    isGrid: false,
    grid: null,
    watchHost: "",
    dirData: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_WATCH_HSOT:
            return state.set('watchHost', action.host)
        case actionTypes.CHANGE_ROUTER:
            return state.set('routers', action.routers)
        case actionTypes.GET_DIR_ITEM:
            return state.set('dirData', action.data)
        default:
            return state
    }
};