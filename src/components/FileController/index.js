import React from 'react';
import { List, Spin, Avatar, Modal } from 'antd';
import { connect } from 'react-redux';
import querystring from 'querystring';
import FileCard from './FileCard';
import './index.css';
import Axios from 'axios';

class FileController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpinning: true,
      listData: [],
      grid: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      },
    };
    this.getDirItem = this.getDirItem.bind(this);
  }

  componentDidMount() {
    const { host, dir } = this.props.params;
    this.getDirItem(host, dir);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.vmode === this.props.params.vmode) {
      const nextHost = nextProps.params.host;
      const nextDir = nextProps.params.dir;
      if (
        nextHost !== this.props.params.host ||
        nextDir !== this.props.params.dir
      ) {
        this.getDirItem(nextHost, nextDir);
      }
    }
  }

  getDirItem(host, path) {
    if (typeof host === 'undefined' || typeof path === 'undefined') {
      return;
    }

    this.setState({
      isSpinning: true,
    });
    Axios.get('/api/listDir', {
      params: {
        host,
        path,
      },
    }).then(res => {
      const data = res.data.result;
      this.setState({
        listData: data,
        isSpinning: false,
      });
    }).catch((err) => {
      Modal.error({
        title: '网络连接错误',
        content: '请检查服务器是否开启或密钥配置',
      })
    })
  }

  onGridClick(itemType, itemName) {
    const { params, history } = this.props;
    let dir;
    if (itemName.slice(0, 1) === '/') {
      dir = params.dir.trim() + itemName;
    } else {
      dir = params.dir.trim() + '/' + itemName;
    }
    if (itemType === 1) {
      history.push({
        pathname: '/listdir',
        search: querystring.stringify({
          host: params.host,
          dir,
          vmode: params.vmode,
        }),
      });
    } else {
      history.push({
        pathname: '/logbrowser',
        search: querystring.stringify({
          host: params.host,
          dir,
        }),
      });
    }
  }

  render() {
    return (
      <Spin
        spinning={this.state.isSpinning}
        size="large"
        wrapperClassName="spin"
      >
        <List
          size="middle"
          grid={this.props.params.vmode === 'list' ? null : this.state.grid}
          dataSource={this.state.listData}
          renderItem={item => (
            <List.Item
              key={item.name}
              onClick={this.onGridClick.bind(this, item.type, item.name)}
            >
              {this.props.params.vmode === 'list'
                ? <List.Item.Meta
                  avatar={
                    item.type === 0
                      ? <Avatar
                        size="large"
                        shape="square"
                        icon="file-text"
                      />
                      : <Avatar
                        size="large"
                        shape="square"
                        icon="folder-open"
                      />
                  }
                  key={item.name}
                  title={
                    <span className="file-name treeNodeUnselectable">
                      {item.name}
                    </span>
                  }
                />
                : <FileCard
                  className="file-card"
                  title={item.name}
                  fileType={item.type}
                />}
            </List.Item>
          )}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  params: querystring.parse(
    state.getIn(['router', 'location', 'search']).substring(1)
  ),
});

export default connect(mapStateToProps, null)(FileController);
