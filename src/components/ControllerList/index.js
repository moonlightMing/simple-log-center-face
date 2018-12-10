import React from 'react';
import { Tree, Input } from 'antd';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';

const { TreeNode } = Tree;
const Search = Input.Search;

const gData = [
  // {
  //   "title": "local",
  //   "key": "local",
  //   "children": [
  //     {
  //       "title": "192.168.31.70",
  //       "key": "192.168.31.70",
  //       "children": null
  //     },
  //     {
  //       "title": "192.168.1.230",
  //       "key": "192.168.1.230",
  //       "children": null
  //     },
  //     {
  //       "title": "127.0.0.1",
  //       "key": "127.0.0.1",
  //       "children": null
  //     }
  //   ]
  // },
  // {
  //   "title": "6kw",
  //   "key": "6kw",
  //   "children": [
  //     {
  //       "title": "192.168.31.70",
  //       "key": "192.168.31.70",
  //       "children": null
  //     },
  //     {
  //       "title": "192.168.1.230",
  //       "key": "192.168.1.230",
  //       "children": null
  //     },
  //     {
  //       "title": "127.0.0.1",
  //       "key": "127.0.0.1",
  //       "children": null
  //     }
  //   ]
  // }
];

const dataList = [];

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


// getHostList(gData)


export default class ControllerList extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    gData: []
  }

  componentWillMount() {
    this.getHostList(this.state.gData)
    generateList(this.state.gData)
    this.setState({
      gData
    })
  }

  getHostList = (data) => {
    axios.get("/listAllHosts").then((res) => {
      let result = res.data.result;
      result.map((value, index, array) => {
        data.push(value)
        return index
      })
    })
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
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
          <TreeNode style={{ "textAlign": "left" }} key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode style={{ "textAlign": "left" }} key={item.key} title={title} />;
    });
    return (
      <div>
        <Search style={{ marginBottom: 8, padding: 5 }} placeholder="Search" onChange={this.onChange} />
        <Router>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(gData)}
          </Tree>
        </Router>
      </div>
    );
  }
}
