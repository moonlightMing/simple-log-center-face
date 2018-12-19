import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    hostList: []
})

export default (state = defaultState, action) => {

    if (action.type === actionTypes.INIT_HOST_LIST) {
        console.log("test")
        return state.set("hostList", action.data);
    }
    return state;
}