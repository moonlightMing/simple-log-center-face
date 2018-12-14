import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Skeleton, Spin } from 'antd';
import "./index.css";
import FileController from '../FileController'
import DirRouter from '../DirRouter'
import LogWindow from '../FileWindow'

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
            <Router>
                <div className="warpper">
                    <div className="nav-hader">
                        <DirRouter />
                    </div>
                    <Spin spinning={false} size="large" wrapperClassName="spin">
                        <div className="window">
                            <Route exact={true} path="/" component={LogWindow}></Route>
                            <Route path="/filepath/:dir" component={FileController}></Route>
                        </div>
                    </Spin>
                </div>
            </Router>
        )
    }
}
