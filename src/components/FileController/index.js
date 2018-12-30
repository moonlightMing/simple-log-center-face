import React, { Fragment } from 'react';
import { List, Button, Icon } from 'antd';
import FileListGrid from './FileListGrid';
import { connect } from 'react-redux';
import querystring from 'querystring';
import * as logWindowActionCreators from '../../store/logWindow/actionCreators';

class FileController extends React.Component {

    componentWillMount() {
        this.getDirItem()
        this.props.history.listen(() => {
            this.getDirItem()
        })
    }

    getDirItem() {
        const host = this.props.params.host;
        const path = this.props.params.dir;
        console.log(host)
        console.log(path)
        this.props.getListData(host, path, null)
    }

    gridDoubleClick(itemType, itemName) {
        if (itemType === 1) {
            this.props.params.dir = this.props.params.dir + '/' + itemName
            this.props.history.push({
                path: this.props.pathname,
                search: querystring.stringify(this.props.params)
            })
        }
    }

    render() {
        return (
            <Fragment>
                <List
                    size="middle"
                    grid={(
                        this.props.params.vmode === 'list' ? null : { gutter: 16, column: 4 }
                    )}
                    dataSource={this.props.listData}
                    renderItem={item => (
                        <List.Item>
                            <FileListGrid
                                onDoubleClick={this.gridDoubleClick.bind(this, item.type, item.name)}
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

const mapStateToProps = state => ({
    pathname: state.getIn(['router', 'location', 'pathname']),
    params: querystring.parse(state.getIn(['router', 'location', 'search']).substring(1)),
    hash: state.getIn(['router', 'location', 'hash']),
    listData: state.getIn(['logWindow', 'dirData'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getListData(host, path, password) {
            dispatch(logWindowActionCreators.getDirItem(host, path, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileController);