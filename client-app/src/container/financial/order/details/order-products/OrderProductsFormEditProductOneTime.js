import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import { fetchOrderDetails } from '../../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from 'validator';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';
import InputReactSelect from '../../../../../components/form/InputReactSelect';

class OrderProductsFormNewProductOneTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: false,
            orderPrice: props.product.currentPrice
                ? props.product.currentPrice.inputInclVat
                    ? props.product.currentPrice.priceInclVat
                    : props.product.currentPrice.price
                : 0,
            totalPrice: '',
            orderProduct: {
                id: props.orderProduct.id,
                amount: props.orderProduct.amount,
                amountReduction: props.orderProduct.amountReduction,
                percentageReduction: props.orderProduct.percentageReduction,
                dateStart: props.orderProduct.dateStart,
                dateEnd: props.orderProduct.dateEnd,
                datePeriodStartFirstInvoice: props.orderProduct.datePeriodStartFirstInvoice,
            },
            product: {
                id: props.product.id,
                description: props.product.invoiceText,
                ledgerId: props.product.ledgerId ? props.product.ledgerId : '',
                costCenterId: props.product.costCenterId ? props.product.costCenterId : '',
                currentPrice: props.product.currentPrice ? props.product.currentPrice : '',
            },
            errors: {
                amount: false,
                ledgerId: false,
                description: false,
            },
        };
    }

    componentDidMount() {
        this.updateOrderPrice();
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                orderProduct: {
                    ...this.state.orderProduct,
                    [name]: value,
                },
            },
            this.updateOrderPrice
        );
    };

    handleLedgerChange = selectedOption => {
        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    ledgerId: selectedOption,
                },
            },
            this.updateOrderPrice
        );
    };

    handleCostCenterChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: value,
            },
        });
    };

    handleInputChangeProduct = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: value,
            },
        });
    };

    updateOrderPrice = () => {
        let inputInclVat =
            this.state.product.currentPrice && this.state.product.currentPrice.inputInclVat
                ? this.state.product.currentPrice.inputInclVat
                : false;
        let price = 0;
        if (inputInclVat) {
            price =
                this.state.product.currentPrice && validator.isFloat(this.state.product.currentPrice.priceInclVat + '')
                    ? this.state.product.currentPrice.priceInclVat
                    : 0;
        } else {
            price =
                this.state.product.currentPrice && validator.isFloat(this.state.product.currentPrice.price + '')
                    ? this.state.product.currentPrice.price
                    : 0;
        }

        let amount = validator.isFloat(this.state.orderProduct.amount + '') ? this.state.orderProduct.amount : 0;
        let percentageReduction = validator.isFloat(this.state.orderProduct.percentageReduction + '')
            ? this.state.orderProduct.percentageReduction
            : 0;
        let amountReduction = validator.isFloat(this.state.orderProduct.amountReduction + '')
            ? this.state.orderProduct.amountReduction
            : 0;

        let totalPrice = 0;
        if (price < 0) {
            const reduction = parseFloat(100) + parseFloat(percentageReduction);
            totalPrice = price * amount * (reduction / 100) - amountReduction;
        } else {
            totalPrice = price * amount * ((100 - percentageReduction) / 100) - amountReduction;
        }
        if (!inputInclVat) {
            let vatPercentage =
                this.state.product.currentPrice && validator.isFloat(this.state.product.currentPrice.vatPercentage + '')
                    ? this.state.product.currentPrice.vatPercentage
                    : 0;
            const vatFactor = (parseFloat(100) + parseFloat(vatPercentage)) / 100;
            totalPrice = totalPrice * vatFactor;
        }

        this.setState({
            ...this.state,
            totalPrice: parseFloat(totalPrice).toFixed(2),
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { orderProduct } = this.state;

        let errors = {};
        let hasErrors = false;
        let errorMessage = false;

        if (validator.isEmpty(orderProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }

        const { product } = this.state;

        if (validator.isEmpty(product.description)) {
            errors.description = true;
            hasErrors = true;
        }

        if (this.props.usesTwinfield) {
            if (validator.isEmpty(String(product.ledgerId))) {
                errors.ledgerId = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            OrderDetailsAPI.updateOrderProductOneTime(orderProduct, product).then(payload => {
                this.props.fetchOrderDetails(this.props.orderProduct.orderId);
                this.props.cancelEdit();
            });
    };

    render() {
        const { amount, amountReduction, percentageReduction } = this.state.orderProduct;
        const { description, costCenterId, ledgerId } = this.state.product;

        let ledgerOptions = this.props.ledgers.filter(ledger => {
            // todo check dit stukje, ziet er raar uit !?
            if (!ledger.vatCode) {
                return (
                    this.state.product.currentPrice && ledger.vatCode === this.state.product.currentPrice.vatPercentage
                );
            } else {
                return (
                    this.state.product.currentPrice &&
                    ledger.vatCode.percentage === this.state.product.currentPrice.vatPercentage
                );
            }
        });

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <div className={'panel-heading'}>
                                <span className={'h5 text-bold'}>Product</span>
                            </div>
                        </div>

                        {this.props.usesTwinfield ? (
                            <div className="row">
                                <InputReactSelect
                                    label={'Grootboek'}
                                    name={'ledgerId'}
                                    id={'ledgerId'}
                                    options={ledgerOptions}
                                    optionName={'description'}
                                    value={ledgerId}
                                    onChangeAction={this.handleLedgerChange}
                                    required={'required'}
                                    error={this.state.errors.ledgerId}
                                />
                                <InputSelect
                                    label={'Kostenplaats'}
                                    id={'costCenterId'}
                                    name={'costCenterId'}
                                    options={this.props.costCenters}
                                    optionName={'description'}
                                    value={costCenterId}
                                    onChangeAction={this.handleCostCenterChange}
                                />
                            </div>
                        ) : null}

                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Orderregel</span>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={'Omschrijving'}
                                id={'description'}
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChangeProduct}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                            <InputText
                                label={'Aantal'}
                                type={'number'}
                                id={'amount'}
                                name={'amount'}
                                value={amount}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.amount}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kortingspercentage'}
                                type={'number'}
                                id={'percentageReduction'}
                                name={'percentageReduction'}
                                value={percentageReduction}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={
                                    this.state.product.currentPrice && this.state.product.currentPrice.inputInclVat
                                        ? 'Prijs incl. BTW'
                                        : 'Prijs excl. BTW'
                                }
                                name={'orderPrice'}
                                value={
                                    '€ ' +
                                    this.state.orderPrice.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: this.state.product.currentPrice
                                            ? this.state.product.currentPrice.priceNumberOfDecimals
                                            : 0,
                                    })
                                }
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kortingsbedrag'}
                                type={'number'}
                                id={'amountReduction'}
                                name={'amountReduction'}
                                value={amountReduction}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={'Totaalbedrag incl. BTW'}
                                name={'totalPrice'}
                                value={
                                    '€ ' +
                                    this.state.totalPrice.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                }
                                readOnly={true}
                            />
                        </div>

                        {this.state.errorMessage && (
                            <div className="col-sm-10 col-md-offset-1 alert alert-danger">
                                {this.state.errorMessage}
                            </div>
                        )}

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.cancelEdit}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
        costCenters: state.systemData.costCenters,
        ledgers: state.systemData.ledgers,
        usesTwinfield: state.systemData.usesTwinfield,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: id => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormNewProductOneTime);
