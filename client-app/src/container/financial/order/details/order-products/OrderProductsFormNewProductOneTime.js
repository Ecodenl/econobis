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
import InputToggle from '../../../../../components/form/InputToggle';

class OrderProductsFormNewProductOneTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: false,
            orderPrice: '',
            totalPrice: '',
            orderProduct: {
                orderId: this.props.orderDetails.id,
                amount: 1,
                amountReduction: 0,
                percentageReduction: 0,
                dateStart: moment().format('YYYY-MM-DD'),
                dateEnd: '',
                datePeriodStartFirstInvoice: moment().format('YYYY-MM-DD'),
            },
            product: {
                code: 'EMP',
                name: 'Eenmalig product',
                durationId: 'none',
                description: '',
                administrationId: this.props.orderDetails.administrationId,
                invoiceFrequencyId: this.props.orderDetails.collectionFrequencyId
                    ? this.props.orderDetails.collectionFrequencyId
                    : 'once',
                vatPercentage: '',
                inputInclVat: false,
                priceNumberOfDecimals: 2,
                price: '',
                priceInclVat: '',
                ledgerId: '',
                costCenterId: '',
                isOneTime: true,
            },
            errors: {
                amount: false,
                priceNumberOfDecimals: false,
                price: false,
                priceInclVat: false,
                ledgerId: false,
                description: false,
            },
        };
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
        let selectedLedger = this.props.ledgers.find(ledger => ledger.id === selectedOption);
        let vatPercentage = selectedLedger.vatCode && selectedLedger.vatCode.percentage;

        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    ledgerId: selectedOption,
                    vatPercentage,
                },
            },
            this.updatePrice
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

        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleInputChangeProductVat = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleInputChangeProductPrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleBlurProductPrice = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: parseFloat(value).toFixed(this.state.product.priceNumberOfDecimals),
            },
        });
    };

    handleBlurDecimals = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let priceNumberOfDecimals = value;

        if (priceNumberOfDecimals < 2) {
            priceNumberOfDecimals = 2;
        }
        if (priceNumberOfDecimals > 6) {
            priceNumberOfDecimals = 6;
        }

        this.setState(
            {
                ...this.state,
                product: {
                    ...this.state.product,
                    priceNumberOfDecimals: priceNumberOfDecimals,
                    price: parseFloat(this.state.product.price).toFixed(priceNumberOfDecimals),
                    priceInclVat: parseFloat(this.state.product.priceInclVat).toFixed(priceNumberOfDecimals),
                },
            },
            this.updatePrice
        );
    };

    updatePrice = () => {
        let inputInclVat = this.state.product.inputInclVat ? this.state.product.inputInclVat : false;
        let price = validator.isFloat(this.state.product.price + '') ? this.state.product.price : 0;
        let priceInclVat = validator.isFloat(this.state.product.priceInclVat + '')
            ? this.state.product.priceInclVat
            : 0;
        let vatPercentage = validator.isFloat(this.state.product.vatPercentage + '')
            ? this.state.product.vatPercentage
            : 0;
        const vatFactor = (parseFloat(100) + parseFloat(vatPercentage)) / 100;

        if (inputInclVat) {
            price = priceInclVat / vatFactor;
            this.setState(
                {
                    ...this.state,
                    product: {
                        ...this.state.product,
                        price: parseFloat(price).toFixed(this.state.product.priceNumberOfDecimals),
                    },
                },
                this.updateOrderPrice
            );
        } else {
            priceInclVat = price * vatFactor;
            this.setState(
                {
                    ...this.state,
                    product: {
                        ...this.state.product,
                        priceInclVat: parseFloat(priceInclVat).toFixed(this.state.product.priceNumberOfDecimals),
                    },
                },
                this.updateOrderPrice
            );
        }
    };

    updateOrderPrice = () => {
        let inputInclVat = false;
        let vatPercentage = 0;
        inputInclVat = this.state.product.inputInclVat;
        vatPercentage = validator.isFloat(this.state.product.vatPercentage + '') ? this.state.product.vatPercentage : 0;
        const vatFactor = (parseFloat(100) + parseFloat(vatPercentage)) / 100;

        let price_incl_vat = validator.isFloat(this.state.product.priceInclVat + '')
            ? this.state.product.priceInclVat
            : 0;
        let price_excl_vat = validator.isFloat(this.state.product.price + '') ? this.state.product.price : 0;

        let amount = validator.isFloat(this.state.orderProduct.amount + '') ? this.state.orderProduct.amount : 0;

        let amountInclVat = parseFloat(price_incl_vat * amount).toFixed(2);
        let amountExclVat = parseFloat(price_excl_vat * amount).toFixed(2);

        let orderPrice = 0;
        if (!inputInclVat) {
            orderPrice = price_excl_vat;
        } else {
            orderPrice = price_incl_vat;
        }
        let amountReduction = validator.isFloat(this.state.orderProduct.amountReduction + '')
            ? this.state.orderProduct.amountReduction
            : 0;
        if (!inputInclVat) {
            amountReduction = amountReduction * vatFactor;
        }
        amountReduction = parseFloat(amountReduction).toFixed(2);

        let percentageReduction = validator.isFloat(this.state.orderProduct.percentageReduction + '')
            ? this.state.orderProduct.percentageReduction
            : 0;
        let percentageReductionFactor = percentageReduction / 100;

        let amountReductionPercentage = 0;

        if (inputInclVat) {
            amountReductionPercentage = amountInclVat * percentageReductionFactor;
        } else {
            amountReductionPercentage = amountExclVat * percentageReductionFactor;
            amountReductionPercentage = amountReductionPercentage * vatFactor;
        }
        amountReductionPercentage = parseFloat(amountReductionPercentage).toFixed(2);
        let totalPrice = amountInclVat - amountReduction - amountReductionPercentage;

        this.setState({
            ...this.state,
            orderPrice: parseFloat(orderPrice).toFixed(this.state.product.priceNumberOfDecimals),
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

        if (!product.inputInclVat) {
            if (validator.isEmpty(product.price + '')) {
                errors.price = true;
                hasErrors = true;
            }
        } else {
            if (validator.isEmpty(product.priceInclVat + '')) {
                errors.priceInclVat = true;
                hasErrors = true;
            }
        }
        if (this.props.usesTwinfield) {
            if (validator.isEmpty(String(product.ledgerId))) {
                errors.ledgerId = true;
                hasErrors = true;
            }
        }
        if (validator.isEmpty(product.description)) {
            errors.description = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            OrderDetailsAPI.newProductAndOrderProduct(orderProduct, product).then(payload => {
                this.props.fetchOrderDetails(orderProduct.orderId);
                this.props.toggleShowNewProductOneTime();
            });
    };

    render() {
        const { amount, amountReduction, percentageReduction } = this.state.orderProduct;
        const {
            description,
            vatPercentage,
            inputInclVat,
            priceNumberOfDecimals,
            price,
            priceInclVat,
            ledgerId,
            costCenterId,
        } = this.state.product;

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
                                    options={this.props.ledgers}
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
                            <div className="form-group col-sm-6">&nbsp;</div>
                            <InputSelect
                                label={'BTW percentage'}
                                name={'vatPercentage'}
                                options={this.props.vatCodes}
                                optionValue={'percentage'}
                                optionName={'description'}
                                value={vatPercentage}
                                onChangeAction={this.props.usesTwinfield ? null : this.handleInputChangeProductVat}
                                placeholder={'Geen'}
                                readOnly={this.props.usesTwinfield}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Invoer inclusief BTW'}
                                name={'inputInclVat'}
                                value={inputInclVat}
                                onChangeAction={this.handleInputChangeProduct}
                            />
                            <InputText
                                label={'Aantal decimalen'}
                                type="number"
                                min={'2'}
                                max={'6'}
                                name={'priceNumberOfDecimals'}
                                value={priceNumberOfDecimals}
                                onChangeAction={this.handleInputChangeProduct}
                                onBlurAction={this.handleBlurDecimals}
                                required={'required'}
                                error={this.state.errors.priceNumberOfDecimals}
                            />
                        </div>

                        <div className="row">
                            {inputInclVat ? (
                                <React.Fragment>
                                    <InputText
                                        label={'Prijs excl. BTW'}
                                        id={'price'}
                                        name={'price'}
                                        value={price}
                                        readOnly={true}
                                        required={'required'}
                                    />
                                    <InputText
                                        label={'Prijs incl. BTW'}
                                        id={'priceInclVat'}
                                        name={'priceInclVat'}
                                        type={'number'}
                                        min={'0'}
                                        max={'1000000'}
                                        value={priceInclVat}
                                        onChangeAction={this.handleInputChangeProductPrice}
                                        onBlurAction={this.handleBlurProductPrice}
                                        required={'required'}
                                        error={this.state.errors.priceInclVat}
                                    />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <InputText
                                        label={'Prijs ex. BTW'}
                                        id={'price'}
                                        name={'price'}
                                        type={'number'}
                                        min={'0'}
                                        max={'1000000'}
                                        value={price}
                                        onChangeAction={this.handleInputChangeProductPrice}
                                        onBlurAction={this.handleBlurProductPrice}
                                        required={'required'}
                                        error={this.state.errors.price}
                                    />
                                    <InputText
                                        label={'Prijs incl. BTW'}
                                        id={'priceInclVat'}
                                        name={'priceInclVat'}
                                        value={priceInclVat}
                                        readOnly={true}
                                        required={'required'}
                                    />
                                </React.Fragment>
                            )}
                        </div>

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
                                label={this.state.product.inputInclVat ? 'Prijs incl. BTW' : 'Prijs excl. BTW'}
                                name={'orderPrice'}
                                value={
                                    '€ ' +
                                    this.state.orderPrice.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: this.state.product.priceNumberOfDecimals,
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
                                onClickAction={this.props.toggleShowNewProductOneTime}
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
        vatCodes: state.systemData.vatCodes,
        usesTwinfield: state.systemData.usesTwinfield,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: id => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormNewProductOneTime);
