import React, { Fragment } from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import querystring from 'querystring';

import * as logWindowActionCreators from '../../store/logWindow/actionCreators';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

class DirRouter extends React.Component {

  render() {
    const dirList = this.props.params.dir.split('/').slice(1)
    return (
      <Fragment>
        <span style={{marginRight: "5px"}} className="treeNodeUnselectable">{this.props.params.host} : /</span>
        <Breadcrumb className="treeNodeUnselectable">
          {
            dirList.map((item, index) => {
              if (index == dirList.length - 1) {
                return <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
              } else {
                this.props.params.dir = '/' + dirList.slice(0, index + 1).join('/')
                return (
                  <BreadcrumbItem key={index}>
                    <Link
                    to={{
                      path: this.props.pathname,
                      search: querystring.stringify(this.props.params)
                    }}>
                      {item}
                    </Link>
                  </BreadcrumbItem>
                )
              }
            })
          }
        </Breadcrumb>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pathname: state.getIn(['router', 'location', 'pathname']),
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initRouter(routes) {
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