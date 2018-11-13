import React, {Component} from 'react';
import { connect } from 'react-redux';

import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import {fetchOrderDetails} from '../../../../../actions/order/OrderDetailsActions';
import OrderProductsFormView from './OrderProductsFormView';
import OrderProductsFormEdit from './OrderProductsFormEdit';
import {isEqual} from "lodash";
import validator from "validator";
import moment from "moment/moment";
import OrderProductsFormDelete from "./OrderProductsFormDelete";
import OrderProductsFormEditProductOneTime from "./OrderProductsFormEditProductOneTime";

class OrderProductsFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            totalPrice: props.orderProduct.totalPriceInclVatAndReduction,
            orderProduct: {
                ...props.orderProduct,
            },
            errors: {
                amount: false,
                dateStart: false,
                dateEnd: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeStartDate = this.handleInputChangeStartDate.bind(this);
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

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
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

            },
            this.updatePrice
        );

    };

    updatePrice = () => {
        let price = validator.isFloat(this.props.orderProduct.product.priceInclVat + '') ? this.props.orderProduct.product.priceInclVat : 0;
        let amount = validator.isFloat(this.state.orderProduct.amount + '') ? this.state.orderProduct.amount : 0;
        let percentageReduction = validator.isFloat(this.state.orderProduct.percentageReduction + '') ? this.state.orderProduct.percentageReduction : 0;
        let amountReduction = validator.isFloat(this.state.orderProduct.amountReduction + '') ? this.state.orderProduct.amountReduction : 0;

        let totalPrice = ((price * amount) * ((100 - percentageReduction) / 100)) - amountReduction;

        this.setState({
            ...this.state,
            totalPrice: totalPrice,
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

    handleInputChangeStartDate(value, name) {
        let dateEnd = '';

        if(value){
            let durationId;

            durationId = this.state.orderProduct.product.durationId;

            switch (durationId) {
                case 'none':
                    dateEnd = '';
                    break;
                case 'month':
                    dateEnd = moment(value).add(1, 'M').format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    dateEnd = moment(value).add(1, 'Q').format('YYYY-MM-DD');
                    break;
                case 'half_year':
                    dateEnd = moment(value).add(6, 'M').format('YYYY-MM-DD');
                    break;
                case 'year':
                    dateEnd = moment(value).add(1, 'y').format('YYYY-MM-DD');
                    break;
                case 'until_cancellation':
                    dateEnd = '';
                    break;
                default:
                    dateEnd = ''
            }
        }

        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value,
                dateEnd: dateEnd
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        let errors = {};
        let hasErrors = false;

        const {orderProduct} = this.state;

        if (validator.isEmpty(orderProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }
        ;

        if (validator.isEmpty(orderProduct.dateStart + '')) {
            errors.dateStart = true;
            hasErrors = true;
        }
        ;

        if (!validator.isEmpty(orderProduct.dateStart + '') && moment(orderProduct.dateEnd).isSameOrBefore(moment(orderProduct.dateStart))) {
            errors.dateEnd = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(orderProduct.dateEnd + '') && moment(orderProduct.dateStart).isSameOrAfter(moment(orderProduct.dateEnd))) {
            errors.dateStart = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        !hasErrors &&
        OrderDetailsAPI.updateOrderProduct(orderProduct).then((payload) => {
            this.props.fetchOrderDetails(this.state.orderProduct.orderId);
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
                    this.state.showEdit && this.props.orderDetails.canEdit && this.props.permissions.manageFinancial && !this.state.orderProduct.product.isOneTime &&
                    <OrderProductsFormEdit
                        orderDetails={this.props.orderDetails}
                        errors={this.state.errors}
                        totalPrice={this.state.totalPrice}
                        orderProduct={this.state.orderProduct}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleInputChangeStartDate={this.handleInputChangeStartDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showEdit && this.props.orderDetails.canEdit && this.props.permissions.manageFinancial && (this.state.orderProduct.product.isOneTime == true) &&
                    <OrderProductsFormEditProductOneTime
                        orderProduct={this.state.orderProduct}
                        product={this.state.orderProduct.product}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete && this.props.orderDetails.canEdit && this.props.permissions.manageFinancial &&
                    <OrderProductsFormDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={this.state.orderProduct.id}
                        orderId={this.state.orderProduct.orderId}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        orderDetails: state.orderDetails
    }
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: (id) => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormItem);
