import React, { Component } from 'react';

import InvoicesAPI from '../../../api/invoice/InvoicesAPI';

class ButtonUnpaidInvoices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountUnpaidInvoices: '-',
        };
    }

    UNSAFE_componentWillMount() {
        InvoicesAPI.getUnpaidInvoices().then(payload => {
            this.setState({
                amountUnpaidInvoices: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size}>
                <div className="panel panel-default" id="dashboardbutton-5">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">NIET BETAALDE NOTA'S</h4>
                        <h4 className="text-center text-bold">{this.state.amountUnpaidInvoices}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonUnpaidInvoices;
