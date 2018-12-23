import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import SearchTree from './components/SearchTree';
import FileWindow from './components/FileWindow';
const {
  Sider, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <Provider store={store}>
            <Layout className="layout">
              <Sider className="sider">
                <SearchTree />
              </Sider>
              <Layout>
                <Content className="content">
                  <FileWindow />
                </Content>
              </Layout>
            </Layout>
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
