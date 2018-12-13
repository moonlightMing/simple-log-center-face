import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default class DirRouter extends React.Component {
    state = {
        host: '',
        routes: [
            {
                path: "data",
                breadcrumbName: "data"
            },
            {
                path: "qwe",
                breadcrumbName: "qwe"
            },
            {
                path: "asd",
                breadcrumbName: "asd"
            }
        ]
    }

    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        // console.log(route)
        // console.log(routes)
        // console.log(paths)
        return last ? <span>{route.breadcrumbName}</span> : <Link to={"/filepath/" + paths.join('/')}>{route.breadcrumbName}</Link>;
    }


    render() {
        return (
            <Fragment>
                <span>{this.state.host}</span>
                <Breadcrumb routes={this.state.routes} itemRender={this.itemRender}>
                </Breadcrumb>
            </Fragment>
        )
    }

}