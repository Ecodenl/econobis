import React, { Component } from 'react';

import OrdersAPI from '../../../api/order/OrdersAPI';

class ButtonCollectionOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountCollectionOrders: '-',
        };
    }

    UNSAFE_componentWillMount() {
        OrdersAPI.getCollectionOrders().then(payload => {
            this.setState({
                amountCollectionOrders: payload,
            });
        });
    }

    render() {
        return (
            <div className={this.props.size}>
                <div className="panel panel-default" id="dashboardbutton-3">
                    <div className="panel-body">
                        <h4 className="text-center text-bold">ORDERS TE INCASSEREN</h4>
                        <h4 className="text-center text-bold">{this.state.amountCollectionOrders}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default ButtonCollectionOrders;
