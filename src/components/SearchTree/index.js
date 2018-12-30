import React from 'react';
import { Tree, Input, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'querystring';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const Search = Input.Search;

const getParentKey = (title, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.title === title)) {
        parentKey = node.key;
      } else if (getParentKey(title, node.children)) {
        parentKey = getParentKey(title, node.children);
      }
    }
  }
  return parentKey;
};

const dataList = [];

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: node.title });
    if (node.children) {
      generateList(node.children);
    }
  }
};

/*对于异步加载的子节点使用该key进行自增赋值*/
let key = 10;

class SearchTree extends React.Component {
  state = {
    expandedKeys: ['1'],
    searchValue: '',
    autoExpandParent: true,
    gData: []
  };

  componentWillMount() {
    Axios.get("/api/listAllHosts")
      .then((res) => {
        this.setState({
          gData: res.data.result
        })
      })
    // .catch(()=>{
    //   Modal.error({
    //     title: 'ERR_CODE 504',
    //     content: '网络连接错误',
    //   })
    // })
  }

  // onSelect = (selectedKeys, info) => {
  //   /*用于打开该节点的详细信息*/
  //   console.log('selected', selectedKeys, info);
  //   console.log(this.state.expandedKeys);
  // };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onDoubleClick(e, node) {
    if (node.isLeaf()) {
      const host = node.props.title.props.children[2];
      this.props.params.host = host;
      this.props.params.dir = '/data';
      if (!this.props.params.vmode) {
        this.props.params.vmode = 'grid';
      }
      this.props.history.push({
        pathname: '/listdir',
        search: queryString.stringify(this.props.params)
      });
    }
  };

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.title, this.state.gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  loop = data => data.map((item) => {
    let { searchValue } = this.state;
    const index = item.title.indexOf(searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{searchValue}</span>
        {afterStr}
      </span>
    ) : <span>{item.title}</span>;
    if (item.children) {
      return (
        <TreeNode icon={<Icon type="home" />} key={item.key} title={title} >
          {this.loop(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode icon={<Icon type="desktop" />} key={item.key} title={title} isLeaf />;
  });

  render() {
    const { expandedKeys, autoExpandParent, gData } = this.state;
    // 进行数组扁平化处理
    generateList(gData);
    return (
      <div style={{ textAlign: "left" }}>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <DirectoryTree
          expandAction="doubleClick"
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          // onSelect={this.onClick}
          onDoubleClick={this.onDoubleClick.bind(this)}
        >
          {this.loop(gData)}
        </DirectoryTree>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gData: state.getIn(['hostTree', 'hostList']),
    isOpenWindow: state.getIn(['logWindow', 'isOpenWindow']),
    params: queryString.parse(state.getIn(['router', 'location', 'search']).substring(1)),
  }
}


export default connect(mapStateToProps, null)(withRouter(SearchTree));