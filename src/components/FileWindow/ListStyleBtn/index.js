import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import querystring from 'querystring';

class ListStyleBtn extends React.Component {

    constructor(props) {
        super(props)
    }

    onClick() {
        const { pathname, params } = this.props;
        const vmode = (params.vmode === 'grid') ? 'list' : "grid";
        this.props.history.push({
            pathname: pathname,
            search: querystring.stringify({
                host: params.host,
                vmode,
                dir: params.dir
            })
        })
    }

    render() {
        // 按钮图标应与实际状态相反
        return (
            <Button
                style={{ marginLeft: "auto", marginRight: "2px" }}
                onClick={this.onClick.bind(this)}
                icon={this.props.params.vmode === 'grid' ? "ordered-list" : "table"}
            />
        )
    }
}

ListStyleBtn.propTypes = {
    pathname: PropTypes.string,
}

const mapStateToProps = state => ({
    pathname: state.getIn(['router', 'location', 'pathname']),
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
})

export default connect(mapStateToProps, null)(ListStyleBtn);