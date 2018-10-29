import React, {Component} from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrderCreateList from "./OrderCreateList";
import OrdersAPI from "../../../../api/order/OrdersAPI";
import OrderCreateViewPdf from "./OrderCreateViewPdf";
import OrderCreateViewEmail from "./OrderCreateViewEmail";
import OrderCreateToolbar from "./OrderCreateToolbar";
import {clearPreviewCreate} from "../../../../actions/order/OrdersActions";
import {connect} from "react-redux";

class OrderCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderId: '',
        };
    };


    componentWillUnmount(){
        this.props.clearPreviewCreate();
    }

    componentDidMount() {
        OrdersAPI.getOrdersForCreating(this.props.orderPreviewCreate).then((payload) => {
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
                                    <OrderCreateToolbar
                                        amountOfOrders={this.state.orders ? this.state.orders.length : 0}
                                        administrationId={this.props.params.id}
                                        orderIds={this.props.orderPreviewCreate}
                                    />
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

const mapStateToProps = (state) => {
    return {
        orderPreviewCreate: state.orderPreviewCreate,
    }
};

const mapDispatchToProps = dispatch => ({
    clearPreviewCreate: () => {
        dispatch(clearPreviewCreate());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateApp);