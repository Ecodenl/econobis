import React, {Component} from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrderCreateList from "./OrderCreateList";
import OrdersAPI from "../../../../api/order/OrdersAPI";
import OrderCreateViewPdf from "./OrderCreateViewPdf";
import OrderCreateViewEmail from "./OrderCreateViewEmail";
import OrderCreateToolbar from "./OrderCreateToolbar";

class OrderCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderId: '',
        };
    };

    componentDidMount() {
        OrdersAPI.getOrdersForCreating(this.props.params.id, this.props.params.filter).then((payload) => {
            this.setState({
                orders: payload.data,
            });
        });
    };

    changeOrder = (orderId) => {
        this.setState({
            orderId: orderId
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={"panel-small"}>
                                    <OrderCreateToolbar filter={this.props.params.filter} amountOfOrders={this.state.orders ? this.state.orders.length : 0} administrationId={this.props.params.id}/>
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-orders-list'}>
                                <OrderCreateList orders={this.state.orders} changeOrder={this.changeOrder}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <OrderCreateViewPdf orderId={this.state.orderId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <OrderCreateViewEmail orderId={this.state.orderId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
            </div>
            </div>
        )
    }
};


export default OrderCreateApp;
