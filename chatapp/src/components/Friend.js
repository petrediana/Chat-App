import React, { Component } from 'react'

class Friend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTalking: false
        }
    }

    render() {
        let { item } = this.props;
        return (
            <div>
                Name: {item.name}
                <input type="button" id="select-friend-btn" value="select"/>
            </div>
        )
    }
}

export default Friend