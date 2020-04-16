import React, { Component } from 'react'

class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item } = this.props.item; 
        return (
            <div>
                {item.info}: {item.message}
            </div>
        )
    }
}

export default Message;