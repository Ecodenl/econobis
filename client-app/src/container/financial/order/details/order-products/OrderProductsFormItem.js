import React, {Component} from 'react';
import { connect } from 'react-redux';

import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import {fetchOrderDetails} from '../../../../../actions/order/OrderDetailsActions';
import OrderProductsFormView from './OrderProductsFormView';
import OrderProductsFormEdit from './OrderProductsFormEdit';
import {isEqual} from "lodash";

class OrderProductsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            orderProduct: {
                ...props.orderProduct,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(!isEqual(this.state.orderProduct, nextProps.orderProduct)){
            this.setState({
                ...this.state,
                orderProduct: {
                    ...nextProps.orderProduct,
                },
            });
        }
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            orderProduct: {...this.props.orderProduct},
        });

        this.closeEdit();
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {orderProduct} = this.state;

        OrderDetailsAPI.updateOrderProduct(orderProduct).then((payload) => {
            this.props.fetchOrderDetails(payload.orderId);
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <OrderProductsFormView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    orderProduct={this.state.orderProduct}
                />
                {
                    this.state.showEdit && this.props.permissions.manageFinancial &&
                    <OrderProductsFormEdit
                        orderProduct={this.state.orderProduct}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: (id) => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormItem);
