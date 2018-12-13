import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';

import SearchTree from '/components/SearchTree'
import FileWindow from '/components/FileWindow'
const {
  Sider, Content,
} = Layout;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Sider className="sider">
            <SearchTree />
          </Sider>
          <Layout>
            <Content className="content">
              <FileWindow/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
