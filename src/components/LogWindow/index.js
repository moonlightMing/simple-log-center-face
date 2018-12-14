import React from 'react';
import Sockette from 'sockette';



// Reconnect 10s later
setTimeout(ws.reconnect, 10e3);

export default class LogWindow extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         ws: null,
    //     }
    // }

    componentWillMount() {
        this.ws = new Sockette('ws://localhost:9090/tailLog?host=192.168.1.230&logFile=/data/a', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => console.log('Connected!', e),
            onmessage: e => console.log('Received:', e),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e)
        });

        ws.send('Hello, world!');
        // ws.json({ type: 'ping' });
        ws.close(); // graceful shutdown
    }

    render() {
        return (
            <div>
                lalal
            </div>
        )
    }
}