import React, {Component} from 'react';
import InvoiceMolliePaymentsFormView from './InvoiceMolliePaymentsFormView';

class InvoiceMolliePaymentsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            molliePayment: {
                ...props.molliePayment,
            },
        };
    }

    render() {
        return (
            <div>
                <InvoiceMolliePaymentsFormView
                    molliePayment={this.state.molliePayment}
                />
            </div>
        );
    }
}

export default InvoiceMolliePaymentsFormItem;
