import React from 'react';
import querystring from 'querystring';
import {connect} from 'react-redux';
import {Terminal} from 'xterm';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
import './index.css';

class LogWindow extends React.Component {
  constructor (props) {
    super (props);
    Terminal.applyAddon (fit);
    Terminal.applyAddon (attach);

    const location = window.location;
    // const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://'
    // let socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + "/api/tailLog?" + logParams
    const logParams = querystring.stringify ({
      host: this.props.params.host,
      path: this.props.params.dir,
      // password: 'vagrant',
    });
    let socketURL = 'ws://localhost:9090/api/tailLog?' + logParams;
    const ws = new WebSocket (socketURL);

    let term = new Terminal ({
      fontSize: 12,
      cursorBlink: 5,
      scrollback: 200,
      tabStopWidth: 5,
    });

    this.state = {
      ws,
      term,
    };
  }

  componentDidMount () {
    let {term, ws} = this.state;
    term.open (document.getElementById ('xterm-win'));
    term.attach (ws, false, true);
    term.fit ();
  }

  componentDidUpdate () {
    let {term} = this.state;
    term.fit ();
  }

  componentWillUnmount () {
    this.state.term.detach(this.state.ws)
    this.state.ws.close ();
  }

  render () {
    return <div id="xterm-win" />;
  }
}

const mapStateToProps = state => ({
  params: querystring.parse (
    state.getIn (['router', 'location', 'search']).substring (1)
  ),
});

export default connect (mapStateToProps, null) (LogWindow);
