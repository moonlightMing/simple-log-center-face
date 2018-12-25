import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as logWindowActionCreators from '../../store/logWindow/actionCreators';

class DirRouter extends React.Component {
  componentWillMount() {
    console.log(this.props.match)
    const routes = this.props.location.search.substring(6).split('/')
    // this.props.initRouter(routes)
  }

  // componentWillReceiveProps() {
  //   this.props.initRouter(this.props.location.search.substring(6), this.props)
  // }

  render() {
    return (
      <Fragment>
        <span>({this.props.match.params.host}) </span>
        <Breadcrumb>
          {/* {
            routers.map((item, index) => {
              if (index === routerLength - 1) {
                return <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={this.props.match.url + "?dir=" + item.path}>
                      {item.name}
                    </Link>
                  </Breadcrumb.Item>
                )
              }
            })
          } */}
        </Breadcrumb>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    host: state.getIn(['logWindow', 'watchHost']),
    routers: state.getIn(['logWindow', 'routers']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initRouter(routes) {
      // if (routes.join('/') === path) {
      //   return
      // }
      const routers = [];
      routes.map((data, index) => {
        routers.push({
          name: data,
          path: '/' + routes.slice(0, index + 1).join('/')
        })
      })
      dispatch(logWindowActionCreators.changeRouter(routers))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirRouter);