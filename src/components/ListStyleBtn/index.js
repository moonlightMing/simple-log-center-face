import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/logWindow/actionCreators';

const ListStyleBtn = (props) => {
    const { isGrid, isOpenWindow, changeListStyle } = props;
    // 按钮图标应与实际状态相反
    return isOpenWindow ? <Button style={{ marginLeft: "auto", marginRight: "2px" }} onClick={changeListStyle} icon={isGrid ? "ordered-list" : "table"} /> : null;
}

const mapStateToProps = (state) => {
    return {
        isGrid: state.getIn(['logWindow', 'isGrid']),
        isOpenWindow: state.getIn(['logWindow', 'isOpenWindow'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeListStyle(e) {
            dispatch(actionCreators.changeListStyleAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStyleBtn);