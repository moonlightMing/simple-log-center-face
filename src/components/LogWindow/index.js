import React from 'react';
import querystring from 'querystring';
import { connect } from 'react-redux';
import axios from 'axios';


class LogWindow extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)



        const ws = new WebSocket("ws://localhost:9090/api/tailLog?" + querystring.stringify({
            host: props.params.host,
            path: props.params.dir,
            password: "vagrant"
        }))
        ws.onopen = (e) => {
            console.log('Connected!', e)
        }

        ws.onmessage = (e) => {
            console.log('Received:', e.data)
            this.setState({
                msgList: [...this.state.msgList, e.data]
            })
        }

        this.state = {
            ws,
            msgList: []
        }

    }

    getWebSocketAddr () {
        axios.get("/api/getWebSocketAddr").then((e)=>{
            console.log(e)
        })
    }

    componentWillMount() {
        console.log(this.props)
        this.getWebSocketAddr()
    }

    componentWillUnmount () {
        console.log("I am close")
        this.state.ws.close()
    }

    render() {
        const { msgList } = this.state;
        return (
            <div>
                {
                    msgList.map((item, index) => {
                        return <div key={item.substring(1) + index}>{item}</div>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
})

export default connect(mapStateToProps, null)(LogWindow);