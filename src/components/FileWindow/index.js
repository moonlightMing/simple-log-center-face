import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Skeleton } from 'antd';
import "./index.css";
import FileController from '../FileController';
import DirRouter from '../DirRouter';
import LogWindow from '../LogWindow';
import ListStyleBtn from './ListStyleBtn';
import GoBackBtn from '../LogWindow/GoBackBtn';

export default class FileWindow extends React.Component {
    render() {
        return (
            <div className="warpper">
                <div className="nav-hader">
                    <Route exact={true} path="/" component={null}></Route>

                    <Route path="/listdir" component={DirRouter}></Route>
                    <Route path="/listdir" component={ListStyleBtn}></Route>

                    <Route path="/logbrowser" component={GoBackBtn}></Route>
                </div>
                <div className="window">
                    <Switch>
                        <Route exact={true} path="/" component={Skeleton}></Route>
                        <Route path="/listdir" component={FileController}></Route>
                        <Route path="/logbrowser" component={LogWindow}></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}
