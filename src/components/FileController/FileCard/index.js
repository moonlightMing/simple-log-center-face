import React from 'react';
import { Avatar, Card } from 'antd';
import './index.css';

const FileCard = (props) => {
    return (
        <Card
            title={<Avatar shape="square" size="large" icon="user" />}
            className="file-card"
            hoverable={true}
        >
            <Card.Meta
            />
            {props.title}
        </Card>
    )
}

export default FileCard;