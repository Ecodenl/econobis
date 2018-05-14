import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderDeleteItem from "./OrderDeleteItem";
import InvoiceNewCollection from "../../invoice/new/InvoiceNewCollection";
import InvoiceNewTransfer from "../../invoice/new/InvoiceNewTransfer";
import ButtonText from "../../../../components/button/ButtonText";

class OrderToolbar  extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
            showNewInvoiceCollection: false,
            showNewInvoiceTransfer: false,
        };
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    preview = () => {
        hashHistory.push(`/order/inzien/${this.props.orderDetails.id}`);
    };

    toggleNewInvoice = () => {
        if(this.props.orderDetails.paymentTypeId === 'collection'){
            this.setState({showNewInvoiceCollection: !this.state.showNewInvoiceCollection});
        }
        else if(this.props.orderDetails.paymentTypeId === 'transfer'){
            this.setState({showNewInvoiceTransfer: !this.state.showNewInvoiceTransfer});
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-eye-open"} onClickAction={this.preview}/>
                        <ButtonText buttonText={'Maak factuur'} onClickAction={this.toggleNewInvoice}/>
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Order: {this.props.orderDetails.subject} / {this.props.orderDetails.number}</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showDelete &&
                    <OrderDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        subject={this.props.orderDetails.subject}
                        id={this.props.orderDetails.id}
                        administrationId={this.props.administrationId}
                    />
                }
                {
                    this.state.showNewInvoiceCollection &&
                    <InvoiceNewCollection
                        closeModal={this.toggleNewInvoice}
                        orderId={this.props.orderDetails.id}
                        orderNumber={this.props.orderDetails.number}
                    />
                }

                {
                    this.state.showNewInvoiceTransfer &&
                    <InvoiceNewTransfer
                        closeModal={this.toggleNewInvoice}
                        orderId={this.props.orderDetails.id}
                        orderNumber={this.props.orderDetails.number}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
        administrationId: state.orderDetails.administrationId,
    };
};

export default connect(mapStateToProps, null)(OrderToolbar);