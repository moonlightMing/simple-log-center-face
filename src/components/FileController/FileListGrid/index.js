import React from 'react';
import { Icon } from 'antd';

const FileListGrid = (props) => (
    <div className="wrapper" onDoubleClick={props.onDoubleClick}>
        <div className="icon">
            {
                props.fileType === 0 ? <Icon alt="xcvsd" theme="filled" type="file-text" /> : <Icon theme="filled" type="folder-open" />
            }
        </div>
        <span className="filename">
            <span>
                {props.title}
            </span>
        </span>
    </div>
);

export default FileListGrid;