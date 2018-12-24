import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const changeListStyleAction = () => ({
    type: actionTypes.CHANGE_LIST_STYLE
});

export const changeWatchHostAction = (host) => ({
    type: actionTypes.CHANGE_WATCH_HSOT, 
    host
});

export const openLogWindowAction = () => ({
    type: actionTypes.OPEN_LOG_WINDOW
})

export const changeRouter = (routers) => ({
  type: actionTypes.CHANGE_ROUTER,
  routers
})

export const getDirItem = (host, path) => {
    return (dispatch) => {
        Axios.get('/listDir', {
            host,
            path
        }).then((res) => {
            const data = res.data;
            const action = {
                type: actionTypes.GET_DIR_ITEM,
                data
            }
            dispatch(action)
        })
    }
}