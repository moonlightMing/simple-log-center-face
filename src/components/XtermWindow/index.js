import React from 'react';
import querystring from 'querystring';
import {Terminal} from 'xterm';
import {connect} from 'react-redux';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
import './index.css';

class XtremWindow extends React.Component {
  constructor (props) {
    super (props);
    Terminal.applyAddon (attach);
    Terminal.applyAddon (fit);

    const term = new Terminal ({
      rows: 36,
    });

    this.state = {
      ws: null,
      term,
    };
  }

  onWindowResize () {
    const {term} = this.state;
    term.fit ();
  }

  componentDidMount () {
    const {term} = this.state;
    const {host, dir} = this.props.params;
    // 开始websocket连接
    // 必须在组件挂在完毕后才能获取到term的size，继而连接websocket设定terminal大小
    const logParams = querystring.stringify ({
      host,
      path: dir,
      termHeight: term.rows,
      termWidth: term.cols,
    });
    let socketURL = `ws://localhost:9090/api/terminalShell?${logParams}`;
    const ws = new WebSocket (socketURL);
    this.setState ({ws});
    term.open (document.getElementById ('terminal-container'));
    term.fit ();

    // websocket关闭或断开时，提示用户
    ws.onclose = () => {
      term.clear ();
      term.writeln ('The WebSocket Close...');
    };

    term.attach (ws, true, false);

    // 注册窗口resize事件监听，
    window.addEventListener ('resize', this.onWindowResize.bind (this));
  }

  componentWillUnmount () {
    const {term, ws} = this.state;

    // 断开前端terminal连接
    term.detach (ws);

    // 关闭服务端websocket
    ws.close ();

    // 取消窗口resize事件监听
    window.removeEventListener ('resize', this.onWindowResize.bind (this));
  }

  render () {
    return <div id="terminal-container" />;
  }
}

const mapStateToProps = state => ({
  params: querystring.parse (
    state.getIn (['router', 'location', 'search']).substring (1)
  ),
});

export default connect (mapStateToProps, null) (XtremWindow);
