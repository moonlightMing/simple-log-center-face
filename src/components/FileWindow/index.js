import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Breadcrumb, Skeleton, Spin } from 'antd'
import "./index.css"

export default class FileWindow extends React.Component {
    render() {
        return (
            <div className="warpper">
                <div className="nav-hader">
                    <Breadcrumb>
                        <Breadcrumb.Item>312.23.12.43</Breadcrumb.Item>
                        <Breadcrumb.Item>data</Breadcrumb.Item>
                        <Breadcrumb.Item>server_01</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Spin spinning={false} size="large">
                    <div className="window">
                        <Link to=""></Link>
                        <Skeleton active />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />
                        dsdewfwefwe<br />

                        dsdewfwefwe<br />
                    </div>
                </Spin>
            </div>
        )
    }
}
