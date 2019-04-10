import React, { Fragment } from 'react';
import querystring from 'querystring';
import { Terminal } from 'xterm';
import { connect } from 'react-redux';
import 'xterm/dist/xterm.css';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as attach from 'xterm/lib/addons/attach/attach';
import './index.css';

class XtremWindow extends React.Component {
  constructor(props) {
    super(props);
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    // Terminal.applyAddon (fullscreen);

    const logParams = querystring.stringify({
      host: this.props.params.host,
      path: this.props.params.dir,
      // password: 'vagrant',
    });
    let socketURL = 'ws://localhost:9090/api/terminalShell?' + logParams;
    const ws = new WebSocket(socketURL);

    let term = new Terminal({
      // cols: 100,
      // rows: 120,
      cursorBlink: 5,
      scrollback: 30,
      tabStopWidth: 4,
      textarea: false,
    });

    this.state = {
      ws,
      term
    };
  }

  componentDidMount() {
    const { term, ws } = this.state;
    term.open(document.getElementById('terminal-container'));
    term.fit();

    // ws.onmessage = data => {
    //   console.log(data.data);
    //   term.write(data.data);
    // };
    ws.onclose = () => {
      console.log('close');
      term.writeln("The WebSocket Close...")
    };
    term.attach (ws, true, false);

    // term.textarea.onkeydown = function (e) {

    //   console.log(e.keyCode.toString())
    //   if (e.keyCode.toString() === "13") {
    //     ws.send("\r\n")
    //     // term.write("\r\n")
    //   } else {
    //     ws.send(e.key.toString());
    //   }
    // };

    // term.on('data', function (data) {
    //   // console.log('data xterm=>', data);
    //   term.write(data.data);
    // });
  }

  componentWillUnmount() {
    this.state.term.detach(this.state.ws)
    this.ws.close()
  }

  render() {
    return (
      <Fragment>
        <div id="terminal-container" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  params: querystring.parse(
    state.getIn(['router', 'location', 'search']).substring(1)
  ),
});

export default connect(mapStateToProps, null)(XtremWindow);
