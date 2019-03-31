import React from 'react';
import querystring from 'querystring';
import {connect} from 'react-redux';
import axios from 'axios';
import {AutoSizer, List} from 'react-virtualized';

class LogWindow extends React.Component {
  constructor (props) {
    super (props);
    this.renderRow = this.renderRow.bind (this);
    const logParams = querystring.stringify ({
      host: props.params.host,
      path: props.params.dir,
      // password: 'vagrant',
    });
    const location = window.location;
    // const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://'
    // let socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + "/api/tailLog?" + logParams

    let socketURL = 'ws://localhost:9090/api/tailLog?' + logParams;
    const ws = new WebSocket (socketURL);
    ws.onopen = e => {
      console.log ('Connected!', e);
    };

    ws.onmessage = e => {
      console.log ('Received:', e.data);
      this.setState ({
        msgList: [...this.state.msgList, e.data],
      });
      // console.log(this.vList)
      this.vList.scrollToRow (-1);
    };

    ws.onclose = e => {
      console.log('Close')
    }

    this.state = {
      ws,
      msgList: [],
    };
  }

  getWebSocketAddr () {
    axios.get ('/api/getWebSocketAddr').then (e => {
      console.log (e);
    });
  }

  componentWillMount () {
    console.log (this.props);
    // this.getWebSocketAddr()
  }

  componentWillUnmount () {
    console.log ('I am close');
    this.state.ws.close ();
  }

  renderRow({index, key, style}) {
    // console.log(index, key, style)

    return (
      <div key={key} style={style}>
        {this.state.msgList[index]}
      </div>
    );
  }

  render () {
    const {msgList} = this.state;
    return (
      <AutoSizer>
        {({width, height}) => (
          <List
            ref={vList => (this.vList = vList)}
            width={width}
            height={height}
            rowHeight={20}
            rowRenderer={this.renderRow}
            rowCount={msgList.length}
            style={{whiteSpace: 'pre', outline: 'none'}}
          />
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = state => ({
  params: querystring.parse (
    state.getIn (['router', 'location', 'search']).substring (1)
  ),
});

export default connect (mapStateToProps, null) (LogWindow);
