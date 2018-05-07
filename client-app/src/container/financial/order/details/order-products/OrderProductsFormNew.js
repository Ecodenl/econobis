import React, {Component} from 'react';
import {connect} from 'react-redux';

import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import {fetchOrderDetails} from '../../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from "../../../../../components/form/InputSelect";
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from "validator";
import InputDate from "../../../../../components/form/InputDate";

class OrderProductsFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: '0',
            totalPrice: '0',
            orderProduct: {
                orderId: this.props.orderDetails.id,
                productId: '',
                description: '',
                amount: 0,
                amountReduction: 0,
                percentageReduction: 0,
                dateStart: '',
                dateEnd: '',
            },
            errors: {
                productId: false,
                amount: false,
                dateStart: false,
                dateEnd: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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
        let price = validator.isFloat(this.state.price + '') ? this.state.price : 0;
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

    handleChangeProduct = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let price = 0;

        if (value) {
            let product = this.props.orderDetails.administration.products.filter((product) => product.id == value);
            price = product[0].priceInclVat;
        }

        this.setState({
            ...this.state,
            price: price,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value
            },
            },
            this.updatePrice
        );
    };

    handleSubmit = event => {
        event.preventDefault();

        const {orderProduct} = this.state;

        let errors = {};
        let hasErrors = false;


        if (validator.isEmpty(orderProduct.productId + '')) {
            errors.productId = true;
            hasErrors = true;
        }
        ;

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

        if (validator.isEmpty(orderProduct.dateEnd + '')) {
            errors.dateEnd = true;
            hasErrors = true;
        }
        ;

        this.setState({...this.state, errors: errors});

        // If no errors send form
        !hasErrors &&
        OrderDetailsAPI.newOrderProduct(orderProduct).then((payload) => {
            this.props.fetchOrderDetails(orderProduct.orderId);
            this.props.toggleShowNew();
        });
    };

    render() {

        const {productId, description, amount, amountReduction, percentageReduction, dateStart, dateEnd} = this.state.orderProduct;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Order nummer"}
                                name={"orderId"}
                                value={this.props.orderDetails.number}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Product"}
                                id="productId"
                                name={"productId"}
                                options={this.props.orderDetails.administration.products}
                                value={productId}
                                onChangeAction={this.handleChangeProduct}
                                required={"required"}
                                error={this.state.errors.productId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={"Omschrijving"}
                                id={"description"}
                                name={"description"}
                                value={description}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Aantal"}
                                type={'number'}
                                id={"amount"}
                                name={"amount"}
                                value={amount}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.amount}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Kortingspercentage"}
                                type={'number'}
                                id={"percentageReduction"}
                                name={"percentageReduction"}
                                value={percentageReduction}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Bedrag"}
                                name={"price"}
                                value={'€' + this.state.price.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Kortingsbedrag"}
                                type={'number'}
                                id={"amountReduction"}
                                name={"amountReduction"}
                                value={amountReduction}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Totaalbedrag"}
                                name={"totalPrice"}
                                value={'€' + this.state.totalPrice.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Datum in"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                                required={"required"}
                                error={this.state.errors.dateStart}
                            />
                            <InputDate
                                label="Datum uit"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                                required={"required"}
                                error={this.state.errors.dateEnd}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                        onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                        value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: (id) => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormNew);
