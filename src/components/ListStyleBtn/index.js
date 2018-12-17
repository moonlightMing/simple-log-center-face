import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

const ListStyleBtn = (props) => {
    const { isGrid, changeListStyle } = props;
    return (
        // 按钮图标应与实际状态相反
        <Button style={{ marginLeft: "auto", marginRight: "2px" }} onClick={changeListStyle} icon={isGrid ? "ordered-list" : "table"} />
    )
}

const mapStateToProps = (state) => {
    return {
        isGrid: state.isGrid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeListStyle(e) {
            const action = {
                type: 'CHANGE_LIST_STYLE'
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStyleBtn);