import React from 'react';
import { Button } from 'antd';
export default class ListStyleBtn extends React.Component {

    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick () {
        
    }


    render () {
        return (
            <Button onClick={this.onClick} icon={this.state.isGrid ? "table" : "ordered-list"} />
        )
    }
}