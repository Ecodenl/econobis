import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderDeleteItem from "./OrderDeleteItem";
import ButtonText from "../../../../components/button/ButtonText";
import {previewCreate} from "../../../../actions/order/OrdersActions";

class OrderToolbar  extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
            showNewInvoice: false,
        };
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    preview = () => {
        hashHistory.push(`/order/inzien/${this.props.orderDetails.id}`);
    };

    newInvoice = () => {
        this.props.previewCreate([this.props.orderDetails.id]);
        hashHistory.push(`/financieel/${this.props.orderDetails.administrationId}/orders/aanmaken`);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {!this.props.orderDetails.canCreateInvoice &&
                            <ButtonIcon iconName={"glyphicon-eye-open"} onClickAction={this.preview}/>
                        }
                        {this.props.orderDetails.canCreateInvoice &&
                        <ButtonText buttonText={'Preview factuur'} onClickAction={this.newInvoice}/>
                        }
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

const mapDispatchToProps = dispatch => ({
    previewCreate: (ids) => {
        dispatch(previewCreate(ids));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderToolbar);