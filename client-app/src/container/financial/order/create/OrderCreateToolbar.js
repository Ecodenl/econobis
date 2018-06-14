import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderCreateConfirmCollection from "./OrderCreateConfirmCollection";
import OrderCreateConfirmTransfer from "./OrderCreateConfirmTransfer";

class OrderCreateToolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCreate: false,
        };
    };

    showCreate = () => {
        this.setState({showCreate: !this.state.showCreate});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        {this.props.amountOfOrders > 0 &&
                        <ButtonIcon iconName={"glyphicon-file"} onClickAction={this.showCreate}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4
                    className="text-center">Facturen aanmaken({this.props.amountOfOrders})</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showCreate && this.props.filter === 'incassos' &&
                    <OrderCreateConfirmCollection
                        closeModal={this.showCreate}
                        administrationId={this.props.administrationId}
                        amountOfOrders={this.props.amountOfOrders}
                        filter={this.props.filter}
                    />
                }
                {
                    this.state.showCreate && this.props.filter === 'facturen' &&
                    <OrderCreateConfirmTransfer
                        closeModal={this.showCreate}
                        administrationId={this.props.administrationId}
                        amountOfOrders={this.props.amountOfOrders}
                        filter={this.props.filter}
                    />
                }
            </div>
        );
    }
};

export default OrderCreateToolbar;