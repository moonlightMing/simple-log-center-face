import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { List } from 'antd';
import FileListGrid from './FileListGrid';
import { connect } from 'react-redux';
import * as logWindowActionCreators from '../../store/logWindow/actionCreators';

class FileController extends React.Component {

  componentDidMount() {
    const host = this.props.watchHost;
    const path = this.props.location.search.substring(4)
    // this.props.getDirItem(host, path)

    console.log(this.props)

    this.props.getDirItem(host, path)

    this.props.history.listen(() => {
      this.props.getDirItem(host, path)
    })
  }

  componentWillUpdate(nextProps) {
    // console.log(nextProps)
    // const nHost = nextProps.match.params.host;
    // const nPath = nextProps.location.search;
    // const host = this.props.watchHost;
    // if (this.props.location.search != nPath || this.props.match.params.host != nHost) {
    //     this.props.getDirItem(nHost, nPath)
    // }
  }

  onDoubleClick() {
    console.log("double click")
    console.log(this.props)
    this.props.history.push('sdf')
  }

  render() {
    return (
      <Fragment>
        <List
          size="middle"
          grid={this.props.grid}
          dataSource={this.props.data}
          renderItem={(item) => (
            <List.Item>
              <FileListGrid
                fileType={item.type}
                title={item.name}
                onDoubleClick={this.onDoubleClick.bind(this)}
              />
              {/* <List.Item.Meta
                                avatar={<Icon alt="xcvsd" theme="filled" type="file-text" />}
                                title={item.name}
                            /> */}
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isGrid: state.getIn(['logWindow', 'isGrid']),
    grid: state.getIn(['logWindow', 'grid']),
    data: state.getIn(['logWindow', 'dirData']),
    watchHost: state.getIn(['logWindow', 'watchHost'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDirItem(host, path) {
      dispatch(logWindowActionCreators.getDirItem(host, path))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileController));