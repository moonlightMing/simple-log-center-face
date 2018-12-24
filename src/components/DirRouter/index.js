import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as logWindowActionCreators from '../../store/logWindow/actionCreators';

class DirRouter extends React.Component {
  componentWillMount() {
    this.props.routerChange(this.props.location.search.substring(6), this.props)
  }

  componentWillReceiveProps() {
    this.props.routerChange(this.props.location.search.substring(6), this.props)
  }

  render() {
    const { routers } = this.props;
    const routerLength = routers.length
    return (
      <Fragment>
        <span>({this.props.match.params.host})</span>
        <Breadcrumb>
          {
            routers.map((item, index) => {
              if (index !== routerLength - 1) {
                // return <Breadcrumb.Item key={index}><a href={this.props.match.url + "?dir=" + item}>{item}</a></Breadcrumb.Item>
                return <Breadcrumb.Item key={index}><Link to={this.props.match.url + "?dir=/" + routers.slice(0,-1).join('/')}>{item}</Link></Breadcrumb.Item>
              } else {
                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
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
    host: state.getIn(['logWindow', 'watchHost']),
    routers: state.getIn(['logWindow', 'routers']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    routerChange(path, props) {
      if (props.routers.join('/') === path) {
        return
      }
      const routers = [];
      path.split('/').map((data) => {
        routers.push(data)
      })
      dispatch(logWindowActionCreators.changeRouter(routers))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirRouter);