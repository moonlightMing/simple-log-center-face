import React from 'react';
import { Button } from 'antd';


const GoBackBtn = (props) => {
    return (
        <Button
            style={{ marginLeft: "auto", marginRight: "2px" }}
            onClick={() => props.history.goBack()}
            icon={"arrow-left"}
        />
    )
}

export default GoBackBtn;