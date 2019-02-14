import React from 'react';
import querystring from 'querystring';
import { connect } from 'react-redux';
import axios from 'axios';
import { AutoSizer, List } from 'react-virtualized';

class LogWindow extends React.Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    console.log(props)

    const ws = new WebSocket("ws://localhost:9090/api/tailLog?" + querystring.stringify({
      host: props.params.host,
      path: props.params.dir,
      password: "chuangyou@123"
    }))
    ws.onopen = (e) => {
      console.log('Connected!', e)
    }

    ws.onmessage = (e) => {
      console.log('Received:', e.data)
      this.setState({
        msgList: [...this.state.msgList, e.data]
      })
      // console.log(this.vList)
      // this.vList.scrollToRow(-1)
    }

    this.state = {
      ws,
      msgList: []
    }

  }

  getWebSocketAddr() {
    axios.get("/api/getWebSocketAddr").then((e) => {
      console.log(e)
    })
  }

  componentWillMount() {
    console.log(this.props)
    // this.getWebSocketAddr()
  }

  componentWillUnmount() {
    console.log("I am close")
    this.state.ws.close()
  }

  renderRow({ index, key, style }) {
    // console.log(index, key, style)

    return (
      <div
        key={key}
        style={style}
      >
        {this.state.msgList[index]}
      </div>
    )
  }

  render() {
    const { msgList } = this.state;
    return (
      <AutoSizer>
        {
          ({ width, height }) => (
            <List
              ref={vList => this.vList = vList}
              width={width}
              height={height}
              rowHeight={20}
              rowRenderer={this.renderRow}
              rowCount={msgList.length}
              style={{whiteSpace: "pre"}}
            />
          )
        }
      </AutoSizer>
    )
  }
}

const mapStateToProps = state => ({
  params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
})

export default connect(mapStateToProps, null)(LogWindow);