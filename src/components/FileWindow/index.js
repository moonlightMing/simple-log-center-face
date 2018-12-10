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
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null
        }
    }

    componentWillMount() {
        this.getPath();
    }

    componentWillReceiveProps() {
        //任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
        this.getPath();
    }

    getPath() {
        //对路径进行切分，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.context.router.history.location.pathname.split('/').filter(i => i);
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
            const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            console.log('url')
            console.log(url)
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
    }

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
