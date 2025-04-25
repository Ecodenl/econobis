import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrderCreateList from './OrderCreateList';
import OrdersAPI from '../../../../api/order/OrdersAPI';
import OrderCreateViewPdf from './OrderCreateViewPdf';
import OrderCreateViewEmail from './OrderCreateViewEmail';
import OrderCreateToolbar from './OrderCreateToolbar';
import { clearPreviewCreate } from '../../../../actions/order/OrdersActions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const OrderCreateAppWrapper = props => {
    const params = useParams();
    return <OrderCreateApp {...props} params={params} />;
};

class OrderCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderId: '',
            isLoading: false,
        };
    }

    componentWillUnmount() {
        this.props.clearPreviewCreate();
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        OrdersAPI.getOrdersForCreating(this.props.orderPreviewCreate)
            .then(payload => {
                this.setState({
                    orders: payload.data,
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
    }

    changeOrder = orderId => {
        this.setState({
            orderId: orderId,
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <OrderCreateToolbar
                                        orderIds={this.props.orderPreviewCreate}
                                        amountOfOrders={this.state.orders ? this.state.orders.length : 0}
                                        administrationId={this.props.params.id}
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
                                    <OrderCreateList
                                        orders={this.state.orders}
                                        isLoading={this.state.isLoading}
                                        changeOrder={this.changeOrder}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <OrderCreateViewPdf
                                        orderId={this.state.orderId}
                                        isLoading={this.state.isLoading}
                                        amountOfOrders={this.state.orders ? this.state.orders.length : 0}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <OrderCreateViewEmail
                                        orderId={this.state.orderId}
                                        isLoading={this.state.isLoading}
                                        amountOfOrders={this.state.orders ? this.state.orders.length : 0}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderPreviewCreate: state.orderPreviewCreate,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewCreate: () => {
        dispatch(clearPreviewCreate());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateAppWrapper);
