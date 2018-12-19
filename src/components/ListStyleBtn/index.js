import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/window/actionCreators';

const ListStyleBtn = (props) => {
    const { isGrid, changeListStyle } = props;
    return (
        // 按钮图标应与实际状态相反
        <Button style={{ marginLeft: "auto", marginRight: "2px" }} onClick={changeListStyle} icon={isGrid ? "ordered-list" : "table"} />
    )
}

const mapStateToProps = (state) => {
    return {
        isGrid: state.get('logWindow').get('isGrid')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeListStyle(e) {
            dispatch(actionCreators.changeListStyle())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStyleBtn);