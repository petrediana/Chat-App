import React, { Component } from 'react'

class Friend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendName: this.props.item.name,
            friendId: this.props.item._id,
            isTalking: false
        };

        this.select = () => {
            this.props.onSelect(this.props.item);
        };
    }

    render() {
        return (
            <div>
                Name: {this.state.friendName}  
                <input type="button" id="select-friend-btn" value="select" onClick={this.select}/>
            </div>
        )
    }
}

export default Friend