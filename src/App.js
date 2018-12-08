import React, { Component } from 'react';
import { Button, Layout } from 'antd';
import './App.css';

import ControllerList from './components/ControllerList'
import FileWindow from './components/FileWindow'
const {
  Header, Sider, Content,
} = Layout;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Sider className="sider">
            <ControllerList />
          </Sider>
          <Layout>
            {/* <Header>
              <Button >点击一下</Button>
            </Header> */}
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
