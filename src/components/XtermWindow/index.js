import React, {Fragment} from 'react';
import {Terminal} from 'xterm';
import '../../../node_modules/xterm/dist/xterm.css';

import * as fullscreen
  from '../../../node_modules/xterm/lib/addons/fullscreen/fullscreen';
// import * as fit from '../../../node_modules/xterm/dist/addons/fit/fit';
import './index.css';

export default class XtremWindow extends React.Component {
  componentDidMount () {
    Terminal.applyAddon (fullscreen);
    // Terminal.applyAddon (fit);
    let term = new Terminal ({
      cols: 100,
      rows: 120,
      cursorBlink: 5,
      scrollback: 30,
      tabStopWidth: 4,
      textarea: true
  });
    term.open (document.getElementById ('terminal-container'));
    term.toggleFullScreen(true);
    // term.fit ();
  }

  render () {
    return (
      <Fragment>
        <div id="terminal-container" />
      </Fragment>
    );
  }
}
