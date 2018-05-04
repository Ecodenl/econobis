import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderDeleteItem from "./OrderDeleteItem";

class OrderToolbar  extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Order: {this.props.subject} / {this.props.number}</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showDelete &&
                    <OrderDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        subject={this.props.subject}
                        id={this.props.id}
                        administrationId={this.props.administrationId}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        subject: state.orderDetails.subject,
        number: state.orderDetails.number,
        id: state.orderDetails.id,
        administrationId: state.orderDetails.administrationId,
    };
};

export default connect(mapStateToProps, null)(OrderToolbar);