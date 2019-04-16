import React from 'react';
import {Tree, Input, Icon, Modal} from 'antd';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'querystring';
import {bindActionCreators} from 'redux';
import {isWebTerminalOpenAction} from '../../store/hostTree/actionCreators';

const DirectoryTree = Tree.DirectoryTree;
const {TreeNode} = Tree;
const Search = Input.Search;

const getParentKey = (title, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some (item => item.title === title)) {
        parentKey = node.key;
      } else if (getParentKey (title, node.children)) {
        parentKey = getParentKey (title, node.children);
      }
    }
  }
  return parentKey;
};

const dataList = [];

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push ({key, title: node.title});
    if (node.children) {
      generateList (node.children);
    }
  }
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: ['1'],
    searchValue: '',
    autoExpandParent: true,
    gData: [],
  };

  componentWillMount () {
    // 检测WebTerminal是否开启
    this.props.isWebTerminalOpenAction ();

    Axios.get ('/api/listAllHosts')
      .then (res => {
        this.setState ({
          gData: res.data.result,
        });
      })
      .catch (() => {
        Modal.error ({
          title: 'ERR_CODE 504',
          content: '网络连接错误',
        });
      });
  }

  onExpand = expandedKeys => {
    this.setState ({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onNodeDoubleClick (event, node) {
    if (!node.isLeaf ()) {
      return;
    }
    
    const {params, history} = this.props;
    // 避免重复双击引起的多次请求
    // if (this.props.params.host === host) {
    //   return;
    // }

    // 搜索时，需要使用创建元素时写入的host属性
    params.host = node.props.host;
    params.dir = '';
    if (!params.vmode) {
      params.vmode = 'grid';
    }
    history.push ({
      pathname: '/listdir',
      search: queryString.stringify (params),
    });
  }

  onNodeRightClick({event, node}) {
    if (!node.isLeaf ()) {
      return;
    }
    if (this.props.isWebTerminalOpen) {
      window.open (`/terminal?host=${node.props.host}`);
    }
  }

  onChange = e => {
    const value = e.target.value;
    const expandedKeys = dataList
      .map (item => {
        if (item.title.indexOf (value) > -1) {
          return getParentKey (item.title, this.state.gData);
        }
        return null;
      })
      .filter ((item, i, self) => item && self.indexOf (item) === i);

    this.setState ({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  loop = data =>
    data.map (item => {
      let {searchValue} = this.state;
      const index = item.title.indexOf (searchValue);
      const beforeStr = item.title.substr (0, index);
      const afterStr = item.title.substr (index + searchValue.length);
      const title = index > -1
        ? <span>
            {beforeStr}
            <span style={{color: '#f50'}}>{searchValue}</span>
            {afterStr}
          </span>
        : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode icon={<Icon type="home" />} key={item.key} title={title}>
            {this.loop (item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          icon={<Icon type="desktop" />}
          key={item.key}
          title={title}
          host={item.title}
          isLeaf
        />
      );
    });

  render () {
    const {expandedKeys, autoExpandParent, gData} = this.state;
    // 进行数组扁平化处理
    generateList (gData);
    return (
      <div style={{textAlign: 'left'}}>
        <Search
          className="treeNodeUnselectable"
          style={{marginBottom: 8}}
          placeholder="Search"
          onChange={this.onChange}
        />
        <DirectoryTree
          expandAction="doubleClick"
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onDoubleClick={this.onNodeDoubleClick.bind (this)}
          onRightClick={this.onNodeRightClick.bind (this)}
        >
          {this.loop (gData)}
        </DirectoryTree>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gData: state.getIn (['hostTree', 'hostList']),
    isWebTerminalOpen: state.getIn (['hostTree', 'isWebTerminalOpen']),
    params: queryString.parse (
      state.getIn (['router', 'location', 'search']).substring (1)
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  isWebTerminalOpenAction: bindActionCreators (
    isWebTerminalOpenAction,
    dispatch
  ),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  withRouter (SearchTree)
);
