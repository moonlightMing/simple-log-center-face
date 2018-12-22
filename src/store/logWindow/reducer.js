import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    isGrid: false,
    grid: null,
    watchHost: "",
    isOpenWindow: false,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LIST_STYLE:
            // immutable对象的set方法，会结合之前immutable对象的值和设置的值返回一个全新的对象
            if (state.get('isGrid')) {
                return state.set('isGrid', false)
                    .set('grid', null)
            } else {
                return state.set('isGrid', true)
                    .set('grid', {
                        gutter: 12,
                        column: 10
                    })
            }
        case actionTypes.CHANGE_WATCH_HSOT:
            return state.set('watchHost', action.host)
        case actionTypes.OPEN_LOG_WINDOW:
            return state.set('isOpenWindow', true)
        default:
            return state
    }
};