import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import InvoiceSendConfirm from "./InvoiceSendConfirm";
import ButtonText from "../../../../components/button/ButtonText";
import InvoiceSendConfirmPost from "./InvoiceSendConfirmPost";

class InvoiceSendToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSend: false,
        };
    };

    showSend = () => {
        this.setState({showSend: !this.state.showSend});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {(this.props.amountOfInvoices > 0) && (this.props.type === 'email') &&
                        <ButtonText buttonText={"Facturen e-mailen"} onClickAction={this.showSend}/>
                        }
                        {(this.props.amountOfInvoices > 0) && (this.props.type === 'post') &&
                        <ButtonText buttonText={"Facturen downloaden"} onClickAction={this.showSend}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4
                    className="text-center">Te verzenden facturen versturen({this.props.amountOfInvoices})</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showSend && this.props.type === 'email' &&
                    <InvoiceSendConfirm
                        type={this.props.type}
                        paymentType={this.props.paymentType}
                        invoiceIds={this.props.invoiceIds}
                        closeModal={this.showSend}
                        administrationId={this.props.administrationId}
                    />
                }
                {
                    this.state.showSend && this.props.type === 'post' &&
                    <InvoiceSendConfirmPost
                        type={this.props.type}
                        paymentType={this.props.paymentType}
                        invoiceIds={this.props.invoiceIds}
                        closeModal={this.showSend}
                        administrationId={this.props.administrationId}
                    />
                }
            </div>
        );
    }
};

export default InvoiceSendToolbar;