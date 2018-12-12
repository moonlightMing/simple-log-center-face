import React from 'react';
import { List, Card } from 'antd';

export default class FileController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayHost: '',
            displayDir: '',
            // grid: { gutter: 5, column: 5 },
            grid: {},
            data: [
                {
                    name: "qdsdf.log",
                },
                {
                    name: "qdsdf.log",
                },
                {
                    name: "qdsdf.log",
                },
            ]
        }
    }

    componentDidMount() {
        console.log(this.props.match.params)
    }

    render() {
        return (
            <List
                grid={this.state.grid}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        {/* <Card title={item.name}>Card content</Card> */}
                        hello
                    </List.Item>
                )}
            />
        );
    }
}