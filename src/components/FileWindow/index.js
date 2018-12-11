import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Breadcrumb, Skeleton, Spin } from 'antd';
import "./index.css";
import FileList from './File'

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
                        <Breadcrumb>
                            {/* <Breadcrumb.Item><Link to="/file/15.32.45.65">geng</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/file/312.23.12.43">312.23.12.43</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/file/12.23.12.43">312.23.12.43</Link></Breadcrumb.Item> */}
                        </Breadcrumb>
                    </div>
                    <Spin spinning={false} size="large" wrapperClassName="spin">

                        <div className="window">
                            <Route exact={true} path="/" component={Skeleton}></Route>
                            <Route path="/file/:host" component={FileList}></Route>
                        </div>
                    </Spin>
                </div>
            </Router>
        )
    }
}
