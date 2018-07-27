import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../../../components/button/ButtonIcon';
import ButtonText from "../../../../../../components/button/ButtonText";

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
                        <ButtonText buttonText={'Rapportage versturen'} onClickAction={() => this.props.createPaymentInvoices(1, 0)}/>
                        }
                        {this.props.amountOfDistributions > 0 && this.props.distributionTypeId !== 3 &&
                        <ButtonText buttonText={'Facturen maken'} onClickAction={() => this.props.createPaymentInvoices(0, 1)}/>
                        }
                        {this.props.amountOfDistributions > 0 && this.props.distributionTypeId !== 3 &&
                        <ButtonText buttonText={'Rapportage versturen en facturen maken'} onClickAction={() => this.props.createPaymentInvoices(1, 1)}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4
                    className="text-center">Rapportage aanmaken({this.props.amountOfDistributions})</h4></div>
                <div className="col-md-4"/>
            </div>
        );
    }
};

export default PaymentInvoiceCreateToolbar;