import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import InvoiceDetailsFormSetPaid from "./general/InvoiceDetailsFormSetPaid";

class InvoiceToolbar  extends Component {
    constructor(props){
        super(props);

        this.state = {
            showSetPaid: false,
        };
    };

    showSetPaid = () => {
        this.setState({showSetPaid: !this.state.showSetPaid});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {this.props.invoiceDetails.statusId !== 'paid' &&
                            <ButtonIcon iconName={"glyphicon-euro"} onClickAction={this.showSetPaid}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Factuur: {this.props.invoiceDetails.order ? this.props.invoiceDetails.order.contact.fullName : ''} / {this.props.invoiceDetails.number}</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showSetPaid &&
                    <InvoiceDetailsFormSetPaid
                        closeModal={this.showSetPaid}
                        invoiceId={this.props.invoiceDetails.id}
                        amountOpen={this.props.invoiceDetails.amountOpen}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps, null)(InvoiceToolbar);