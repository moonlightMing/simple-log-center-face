import React from 'react';
import { Icon } from 'antd';

export default class FileListGrid extends React.component {

    constructor(props) {
        super(props)
    }

    render() {



        return (
            <span>
                <span className="icon">
                    {
                        this.props.fileType === "file" ? <Icon type="file-text" /> : <Icon type="folder-open" />
                    }
                </span>
                <span className="filename">
                    <span>
                        {this.props.title}
                    </span>
                </span>
            </span>
        )
    }
}