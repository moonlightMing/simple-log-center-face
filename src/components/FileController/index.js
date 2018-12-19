import React, { Fragment } from 'react';
import { List } from 'antd';
import FileListGrid from '../FileListGrid';
import { connect } from 'react-redux';

class FileController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayHost: '',
            displayDir: '',
            data: [
                {
                    "name": "q3esfd",
                    "type": 0,
                    "update_time": "12月/12/15:18",
                    "size": 0,
                    "group": "root",
                    "owner": "root"
                },
                {
                    "name": "qwe",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                },
                {
                    "name": "15615",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                },
                {
                    "name": "wefewg",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                }, {
                    "name": "wefewg",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                }, {
                    "name": "wefewg",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                }, {
                    "name": "wefewg",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                }, {
                    "name": "wefewg",
                    "type": 1,
                    "update_time": "12月/12/15:27",
                    "size": 6,
                    "group": "root",
                    "owner": "root"
                }
            ]
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.dir)
    }


    render() {
        return (
            <Fragment>
                <List
                    size="middle"
                    grid={this.props.grid}
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

const mapStateToProps = (state) => {
    return {
        isGrid: state.getIn(['logWindow', 'isGrid']),
        grid: state.getIn(['logWindow', 'grid'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileController);