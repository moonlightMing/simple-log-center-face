import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';

const defaultState = fromJS({
    isGrid: false,
    grid: null
});

export default (state = defaultState, action) => {

    if (action.type === actionTypes.CHANGE_LIST_STYLE) {
        // immutable对象的set方法，会结合之前immutable对象的值和设置的值返回一个全新的对象
        if (state.get('isGrid')) {
            return state.set('isGrid', false)
                        .set('grid', null)

        } else {
            return state.set('isGrid', true)
                        .set('grid', {gutter: 12,column: 10})
        }
    }
    return state;
};