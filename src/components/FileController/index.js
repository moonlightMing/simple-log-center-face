import React, { Fragment } from 'react';
import { List, Button, Icon } from 'antd';
import FileListGrid from './FileListGrid';

export default class FileController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayHost: '',
            displayDir: '',
            isGrid: true,
            grid: null

        }
    }

    componentDidMount() {
        console.log(this.props.match.params.dir)
    }

    

    changeListStyle() {
        // grid
        if (this.state.isGrid) {
            this.setState({
                grid: null
            })
        } else {
            this.setState({
                grid: { gutter: 12, column: 10 }
            })
        }
    }

    onClick() {
        this.setState({
            isGrid: !this.state.isGrid
        }, ()=>{
            this.changeListStyle()
        })

    }

    render() {
        return (
            <Fragment>          
                <List
                    size="middle"
                    grid={this.state.grid}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <FileListGrid
                                fileType={item.type} 
                                title={item.name} 
                            />
                            {/* <List.Item.Meta
                                avatar={<Icon alt="xcvsd" theme="filled" type="file-text" />}
                                title={item.name}
                            /> */}
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}