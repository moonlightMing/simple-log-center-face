import React, { Fragment } from 'react';
import { List, Card, Button, Icon } from 'antd';
import { FileListGrid } from '@/component/FileListGrid';

export default class FileController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayHost: '',
            displayDir: '',
            listStyle:'',
            grid: null,
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
        console.log(this.props.match.params.dir)
    }

    changeListStyle(listStyle) {
        // grid
        if (listStyle === "grid") {
            this.setState({
                grid: {}
            })
        } else {
            this.setState({
                grid: { gutter: 12, column: 10 }
            })
        }
    }

    onClick() {
        if (this.state.listStyle === 'grid') {
            this.setState({
                listStyle:"list"
            })
        } 

        if (this.state.listStyle === 'list') {
            this.setState({
                listStyle:"grid"
            })
        } 

        changeListStyle(this.state.listStyle)
    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.onClick.bind(this)} />
                <List
                    grid={this.state.grid}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <FileListGrid/>
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}