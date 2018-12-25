import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/logWindow/actionCreators';
import querystring from 'querystring';

class ListStyleBtn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: querystring.parse(this.props.location.search.substring(1))
        }
    }

    onClick() {
        console.log(this.props)
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: querystring.stringify({
                vmode: this.state.params.vmode === 'grid' ? 'list' : 'grid',
                dir: this.state.params.dir,
                ip: this.state.params.ip
            })
        })
    }

    render() {
        // 按钮图标应与实际状态相反
        return (
            <Button
                style={{ marginLeft: "auto", marginRight: "2px" }}
                onClick={this.onClick.bind(this)}
                icon={this.state.params.vmode === 'grid' ? "ordered-list" : "table"}
            />
        )
    }
}

export default connect(null, null)(ListStyleBtn);