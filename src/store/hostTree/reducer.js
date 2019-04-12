import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const defaultState = fromJS ({
  hostList: [],
  isWebTerminalOpen: false,
});

export default (state = defaultState, action) => {
  if (action.type === actionTypes.INIT_HOST_LIST) {
    return state.set ('hostList', action.data);
  }

  if (action.type === actionTypes.IS_WEB_TERMINAL_OPEN) {
    return state.set ('isWebTerminalOpen', action.data);
  }

  return state;
};
