import React from 'react';
import { Icon } from 'antd';

export default class FileListGrid extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className="icon">
                    {
                        this.props.fileType === 0 ? <Icon alt="xcvsd" theme="filled" type="file-text" /> : <Icon theme="filled" type="folder-open" />
                    }
                </div>
                <span className="filename">
                    <span>
                        {this.props.title}
                    </span>
                </span>
            </div>
        )
    }
}