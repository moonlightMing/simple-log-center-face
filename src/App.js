import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router/immutable';
import {Layout} from 'antd';
import PropTypes from 'prop-types';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import SearchTree from './components/SearchTree';
import FileWindow from './components/FileWindow';
import XtermWindow from './components/XtermWindow';
import {Route, Switch} from 'react-router-dom';

const {Sider, Content} = Layout;

const logConsole = () => (
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
);

const termConsole = () => <XtermWindow />;

const App = ({history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <BrowserRouter> */}
        <div className="App">
          <Switch>
            <Route path="/terminal" component={termConsole} />
            <Route path="/" component={logConsole} />
          </Switch>
        </div>
        {/* </BrowserRouter> */}
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
