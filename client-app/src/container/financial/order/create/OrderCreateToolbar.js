import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderCreateConfirm from './OrderCreateConfirm';
import ButtonText from '../../../../components/button/ButtonText';

class OrderCreateToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
        };
    }

    showCreate = () => {
        this.setState({ showCreate: !this.state.showCreate });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                        {this.props.amountOfOrders > 0 && (
                            <ButtonText buttonText={"Maak concept nota's"} onClickAction={this.showCreate} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Nota's aanmaken({this.props.amountOfOrders})</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showCreate && (
                    <OrderCreateConfirm
                        closeModal={this.showCreate}
                        administrationId={this.props.administrationId}
                        amountOfOrders={this.props.amountOfOrders}
                        orderIds={this.props.orderIds}
                    />
                )}
            </div>
        );
    }
}

export default OrderCreateToolbar;
