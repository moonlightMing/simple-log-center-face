import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const defaultState = fromJS ({
  dirData: [],
  isSpinning: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_WATCH_HSOT:
      return state.set ('watchHost', action.host);
    case actionTypes.CHANGE_ROUTER:
      return state.set ('routers', action.routers);
    case actionTypes.GET_DIR_ITEM:
      return state.merge ({dirData: action.data}, {isSpinning: false});
    case actionTypes.SET_SPIN_STATUS:
      return state.set ('isSpinning', action.isSpinning);
    default:
      return state;
  }
};
