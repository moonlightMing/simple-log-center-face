import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import querystring from 'querystring';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

class DirRouter extends React.Component {

    render() {
        const { pathname, params } = this.props;
        const param = querystring.parse(params.substring(1))
        const dirList = param.dir.split('/').slice(1)
        console.log(this.props)
        return (
            <Fragment>
                <span style={{ marginRight: "5px" }} className="treeNodeUnselectable">{param.host} : /</span>
                <Breadcrumb className="treeNodeUnselectable">
                    {
                        dirList.map((item, index) => {
                            if (index === dirList.length - 1) {
                                return <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
                            } else {
                                const dir = '/' + dirList.slice(0, index + 1).join('/')
                                return (
                                    <BreadcrumbItem key={index}>
                                        <Link
                                            to={{
                                                path: pathname,
                                                search: querystring.stringify({
                                                    host: param.host,
                                                    dir,
                                                    vmode: param.vmode
                                                })
                                            }}>
                                            {item}
                                        </Link>
                                    </BreadcrumbItem>
                                )
                            }
                        })
                    }
                </Breadcrumb>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pathname: state.getIn(['router', 'location', 'pathname']),
        params: state.getIn(['router', 'location', 'search']),
    }
}

export default connect(mapStateToProps, null)(DirRouter);