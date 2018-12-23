import React from 'react';
import { Route } from 'react-router-dom';
import { Skeleton, Spin } from 'antd';
import "./index.css";
import FileController from '../FileController';
import DirRouter from '../DirRouter';
import LogWindow from '../FileWindow';
import ListStyleBtn from '../ListStyleBtn';
import { List } from 'immutable';

export default class FileWindow extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         spinning: false
    //     }
    // }

    // setSpinningStart() {
    //     this.setState({
    //         spinning: true
    //     })
    // }

    // setSpinningEnd() {
    //     this.setState({
    //         spinning: false
    //     })
    // }


    render() {
        return (
            <div className="warpper">
                <div className="nav-hader">
                    <Route exact={true} path="/" component={null}></Route>
                    <Route path="/ip/:host/filepath" component={DirRouter}></Route>
                    <Route path="/ip/:host" component={ListStyleBtn}></Route>
                </div>
                <Spin spinning={false} size="large" wrapperClassName="spin">
                    <div className="window">
                        <Route exact={true} path="/" component={Skeleton}></Route>
                        <Route path="/ip/:host/filepath?dir=" component={FileController}></Route>
                    </div>
                </Spin>
            </div>
        )
    }
}
