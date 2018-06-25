import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';

class PaymentInvoiceCreateToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCreate: false,
        };
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {this.props.amountOfDistributions > 0 &&
                        <ButtonIcon iconName={"glyphicon-file"} onClickAction={this.props.createPaymentInvoices}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4
                    className="text-center">Facturen aanmaken({this.props.amountOfDistributions})</h4></div>
                <div className="col-md-4"/>
            </div>
        );
    }
};

export default PaymentInvoiceCreateToolbar;