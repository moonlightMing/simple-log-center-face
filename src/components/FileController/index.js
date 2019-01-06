import React from 'react';
import { List, Spin, Button, Icon } from 'antd';
import FileListGrid from './FileListGrid';
import { connect } from 'react-redux';
import querystring from 'querystring';
import * as logWindowActionCreators from '../../store/logWindow/actionCreators';
import './index.css';
import Axios from 'axios';

class FileController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinning: true,
            listData: [{
                "name": "q3esfd",
                "type": 0,
                "update_time": "12月/12/15:18",
                "size": 0,
                "group": "root",
                "owner": "root"
            }]
        }
        this.getDirItem = this.getDirItem.bind(this)
    }

    componentWillMount() {
        this.getDirItem()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.vmode === this.props.params.vmode) {
            const host = nextProps.params.host;
            const path = nextProps.params.dir;
            this.getDirItem(host, path)
        }
    }

    getDirItem(host, path) {
        this.setState({
            isSpinning: true
        })
        Axios.get('/api/listDir', {
            params: {
                host,
                path,
                password: "vagrant"
            }
        }).then((res) => {
            const data = res.data.result;
            this.setState({
                listData: data,
                isSpinning: false
            })
        })
    }

    // getDirItem() {
    //     const host = this.props.params.host;
    //     const path = this.props.params.dir;
    //     this.props.getListData(host, path, null);
    // }

    gridDoubleClick(itemType, itemName) {
        if (itemType === 1) {
            this.props.params.dir = this.props.params.dir + '/' + itemName
            this.props.history.push({
                pathname: '/listdir',
                search: querystring.stringify(this.props.params)
            })
        }
    }

    render() {
        return (
            <Spin spinning={this.state.isSpinning} size="large" wrapperClassName="spin">
                <List
                    size="middle"
                    grid={(
                        this.props.params.vmode === 'list' ? null : { gutter: 16, column: 4 }
                    )}
                    dataSource={this.state.listData}
                    renderItem={item => (
                        <List.Item>
                            <FileListGrid
                                onDoubleClick={this.gridDoubleClick.bind(this, item.type, item.name)}
                                fileType={item.type}
                                title={item.name}
                                key={item.name}
                            />
                            {/* <List.Item.Meta
                                avatar={<Icon alt="xcvsd" theme="filled" type="file-text" />}
                                title={item.name}
                            /> */}
                        </List.Item>
                    )}
                />
            </Spin>
        );
    }
}

const mapStateToProps = state => ({
    // pathname: state.getIn(['router', 'location', 'pathname']),
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
    hash: state.getIn(['router', 'location', 'hash']),
    // listData: state.getIn(['logWindow', 'dirData']),
    isSpinning: state.getIn(['logWindow', 'isSpinning'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        setSpinState(isSpinning) {
            dispatch(logWindowActionCreators.setSpinStatus(isSpinning))
        },
        getListData(host, path, password) {
            dispatch(logWindowActionCreators.getDirItem(host, path, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileController);