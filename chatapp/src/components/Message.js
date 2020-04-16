import React, { Component } from 'react'

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: this.props.item.info,
            message: this.props.item.message
        };
    }

    render() {
        return (
            <div>
                { this.props.item.info }: { this.state.message }
            </div>
        )
    }
}

export default Message;