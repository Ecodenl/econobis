import React, { Component } from 'react';
import TwinfieldLogPaymentsFormView from './TwinfieldLogPaymentsFormView';

class TwinfieldLogPaymentsFormItem extends Component {
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
                <TwinfieldLogPaymentsFormView twinfieldMessage={this.state.twinfieldMessage} />
            </div>
        );
    }
}

export default TwinfieldLogPaymentsFormItem;
