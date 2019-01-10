import React from 'react';
import { Avatar, Card } from 'antd';
import './index.css';

const FileCard = (props) => {
    return (
        <Card
            className="file-card"
            hoverable={true}
            bodyStyle={{
                padding: 10,
                paddingTop: 12,
                paddingBottom: 12,

            }}
        >
            <Card.Meta
                avatar={
                    props.fileType === 0
                        ?
                        <Avatar shape="square" size="large" icon="file-text" />
                        :
                        <Avatar shape="square" size="large" icon="folder-open" />
                }
                className="treeNodeUnselectable"
                title={
                    <span className="file-name">
                        {props.title}
                    </span>
                }
            />
        </Card>
    )
}

export default FileCard;