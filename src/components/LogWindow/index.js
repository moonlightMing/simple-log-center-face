import React from 'react';

export default class LogWindow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                lalal
            </div>
        )
    }
}