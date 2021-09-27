import React, { Component } from 'react';
import TwinfieldLogInvoicesFormView from './TwinfieldLogInvoicesFormView';

class TwinfieldLogInvoicesFormItem extends Component {
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
                <TwinfieldLogInvoicesFormView twinfieldMessage={this.state.twinfieldMessage} />
            </div>
        );
    }
}

export default TwinfieldLogInvoicesFormItem;
