import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const changeWatchHostAction = host => ({
  type: actionTypes.CHANGE_WATCH_HSOT,
  host,
});

export const changeRouter = routers => ({
  type: actionTypes.CHANGE_ROUTER,
  routers,
});

export const getDirItem = (host, path, password) => {
  return dispatch => {
    console.log ({
      host,
      path,
      password,
    });
    Axios.get ('/api/listDir', {
      params: {
        host,
        path,
      },
    }).then (res => {
      const data = res.data.result;
      const action = {
        type: actionTypes.GET_DIR_ITEM,
        data,
      };
      dispatch (action);
    });
  };
};

export const setSpinStatus = isSpinning => ({
  type: actionTypes.SET_SPIN_STATUS,
  isSpinning,
});
