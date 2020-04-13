import React, { Component } from 'react'

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.cancel = () => {
            this.props.onCancel();
        };
    }

    render() {
        let { item } = this.props;
        return (
            <div>
                <input type="button" name="back" value="back" onClick={this.cancel}/>
                <br></br>
                Conversation between: {item.P1.name} and {item.P2.name}
            </div>
        )
    }
}

export default Conversation