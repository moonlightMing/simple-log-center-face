import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/logWindow/actionCreators';
import querystring from 'querystring';

const ListStyleBtn = (props) => {
    console.log(props)
    const params = querystring.parse(props.location.search.substring(1))
    console.log(params)
    // 按钮图标应与实际状态相反
    return params.vmode ? <Button style={{ marginLeft: "auto", marginRight: "2px" }} onClick={props.onClick} icon={params.vmode === 'grid' ? "ordered-list" : "table"} /> : null;
}

export default connect(null, null)(ListStyleBtn);