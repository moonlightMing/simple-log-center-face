import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Skeleton, Spin } from 'antd';
import "./index.css";
import FileController from '../FileController';
import DirRouter from '../DirRouter';
import LogWindow from '../FileWindow';
import ListStyleBtn from './ListStyleBtn';

export default class FileWindow extends React.Component {
    render() {
        return (
            <div className="warpper">
                <div className="nav-hader">
                    <Route exact={true} path="/" component={null}></Route>
                    <Route path="/listdir" component={DirRouter}></Route>
                    <Route path="/listdir" component={ListStyleBtn}></Route>
                </div>
                <Spin spinning={false} size="large" wrapperClassName="spin">
                    <div className="window">
                        <Switch>
                            <Route exact={true} path="/" component={Skeleton}></Route>
                            <Route path="/listdir" component={FileController}></Route>
                        </Switch>
                    </div>
                </Spin>
            </div>
        )
    }
}
