import * as actionTypes from './actionTypes';

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