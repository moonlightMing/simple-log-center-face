import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import Axios from 'axios';

export const initHostList = () => {
    return (dispatch) => {
        Axios.get("/listAllHosts").then((res) => {
            const data = res.data
            const action = {
                type: actionTypes.INIT_HOST_LIST,
                data: fromJS(data.result)
            }
            dispatch(action)
        }).catch(() => {

        })
    }
};