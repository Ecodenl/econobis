import React, { Component } from 'react';
import TwinfieldLogFormView from './TwinfieldLogFormView';

class TwinfieldLogFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            twinfieldMessage: {
                ...props.twinfieldMessage,
            },
        };
    }

    render() {
        return (
            <div>
                <TwinfieldLogFormView twinfieldMessage={this.state.twinfieldMessage} />
            </div>
        );
    }
}

export default TwinfieldLogFormItem;
