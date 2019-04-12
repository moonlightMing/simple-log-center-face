import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';
import Axios from 'axios';

export const initHostListAction = () => {
  return dispatch => {
    Axios.get ('/api/listAllHosts')
      .then (res => {
        const data = res.data;
        const action = {
          type: actionTypes.INIT_HOST_LIST,
          data: fromJS (data.result),
        };
        dispatch (action);
      })
      .catch (() => {});
  };
};

export const isWebTerminalOpenAction = () => {
  return dispatch => {
    Axios.get ('/api/isWebTerminalOpen').then (res => {
      const data = res.data;
      const action = {
        type: actionTypes.IS_WEB_TERMINAL_OPEN,
        data: fromJS (data.result),
      };
      dispatch (action);
    });
  };
};
