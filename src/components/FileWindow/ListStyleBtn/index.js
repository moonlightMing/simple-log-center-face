import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import querystring from 'querystring';

class ListStyleBtn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: querystring.parse(this.props.location.search.substring(1))
        }
    }

    onClick() {
        this.props.params.vmode = (this.props.params.vmode === 'grid') ? 'list' : "grid";
        this.props.history.push({
            pathname: this.props.pathname,
            search: querystring.stringify(this.props.params)
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
    search: PropTypes.string,
    hash: PropTypes.string,
  }

const mapStateToProps = state => ({
    pathname: state.getIn(['router', 'location', 'pathname']),
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
    hash: state.getIn(['router', 'location', 'hash']),
})

export default connect(mapStateToProps, null)(ListStyleBtn);