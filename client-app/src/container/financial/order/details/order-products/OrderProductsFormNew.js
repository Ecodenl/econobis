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

class OrderProductsFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priceNumberOfDecimals: '2',
            price: '0',
            priceInclVat: '0',
            vatPercentage: '0',
            totalPrice: '0',
            durationId: 'none',
            productHasVariablePrice: false,
            productInputInclVat: false,
            orderProduct: {
                orderId: this.props.orderDetails.id,
                productId: '',
                description: '',
                costCenterId: '',
                amount: 1,
                amountReduction: 0,
                percentageReduction: 0,
                dateStart: moment().format('YYYY-MM-DD'),
                dateEnd: '',
                datePeriodStartFirstInvoice: moment().format('YYYY-MM-DD'),
                variablePrice: null,
            },
            errors: {
                productId: false,
                amount: false,
                dateStart: false,
                dateEnd: false,
                datePeriodStartFirstInvoice: false,
                variablePrice: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeStartDate = this.handleInputChangeStartDate.bind(this);
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
            this.updatePrice
        );
    };

    handleInputChangeVariablePrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                price: value,
                orderProduct: {
                    ...this.state.orderProduct,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleBlurVariablePrice = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                variablePrice: parseFloat(value).toFixed(this.state.priceNumberOfDecimals),
            },
        });
    };

    updatePrice = () => {
        let inputInclVat = false;
        let vatPercentage = 0;
        inputInclVat = this.state.productInputInclVat;
        vatPercentage = validator.isFloat(this.state.vatPercentage + '') ? this.state.vatPercentage : 0;
        const vatFactor = (parseFloat(100) + parseFloat(vatPercentage)) / 100;

        let price_incl_vat = 0;
        let price_excl_vat = 0;
        let variable_price = validator.isFloat(this.state.orderProduct.variablePrice + '')
            ? this.state.orderProduct.variablePrice
            : 0;
        // variable prijs
        if (variable_price) {
            if (inputInclVat) {
                price_incl_vat = variable_price;
                price_excl_vat = variable_price / vatFactor;
            } else {
                price_incl_vat = variable_price * vatFactor;
                price_excl_vat = variable_price;
            }
        } else {
            price_incl_vat = validator.isFloat(this.state.priceInclVat + '') ? this.state.priceInclVat : 0;
            price_excl_vat = validator.isFloat(this.state.price + '') ? this.state.price : 0;
        }

        let amount = validator.isFloat(this.state.orderProduct.amount + '') ? this.state.orderProduct.amount : 0;

        let amountInclVat = parseFloat(price_incl_vat * amount).toFixed(2);
        let amountExclVat = parseFloat(price_excl_vat * amount).toFixed(2);

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
            totalPrice: totalPrice,
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value,
            },
        });
    }

    handleInputChangeStartDate(value, name) {
        let dateEnd = '';

        if (this.state.orderProduct.dateStart && this.state.orderProduct.productId) {
            let durationId;

            if (value) {
                let product = this.props.products.filter(product => product.id == this.state.orderProduct.productId);
                durationId = product[0].durationId;
            }

            switch (durationId) {
                case 'none':
                    dateEnd = '';
                    break;
                case 'month':
                    dateEnd = moment(value)
                        .add(1, 'M')
                        .format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    dateEnd = moment(value)
                        .add(1, 'Q')
                        .format('YYYY-MM-DD');
                    break;
                case 'half_year':
                    dateEnd = moment(value)
                        .add(6, 'M')
                        .format('YYYY-MM-DD');
                    break;
                case 'year':
                    dateEnd = moment(value)
                        .add(1, 'y')
                        .format('YYYY-MM-DD');
                    break;
                case 'until_cancellation':
                    dateEnd = '';
                    break;
                default:
                    dateEnd = '';
            }
        }

        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value,
                dateEnd: dateEnd,
            },
        });
    }

    handleChangeProduct = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let priceNumberOfDecimals = 2;
        let price = 0;
        let priceInclVat = 0;
        let vatPercentage = 0;
        let costCenterId = '';
        let description = '';
        let durationId = false;
        let dateEnd = '';
        let productHasVariablePrice = '';
        let productInputInclVat = false;

        if (value) {
            let product = this.props.products.find(product => product.id == value);
            priceNumberOfDecimals = product.currentPrice.priceNumberOfDecimals;
            price = product.currentPrice.price;
            priceInclVat = product.currentPrice.priceInclVat;
            vatPercentage = product.currentPrice.vatPercentage;
            productInputInclVat = product.currentPrice.inputInclVat;
            costCenterId = product.costCenterId;
            if (!costCenterId) {
                costCenterId = '';
            }
            description = product.invoiceText;
            durationId = product.durationId;
            productHasVariablePrice = product.hasVariablePrice;
        }

        if (durationId && this.state.orderProduct.dateStart) {
            switch (durationId) {
                case 'none':
                    dateEnd = '';
                    break;
                case 'month':
                    dateEnd = moment(this.state.orderProduct.dateStart)
                        .add(1, 'M')
                        .format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    dateEnd = moment(this.state.orderProduct.dateStart)
                        .add(1, 'Q')
                        .format('YYYY-MM-DD');
                    break;
                case 'half_year':
                    dateEnd = moment(this.state.orderProduct.dateStart)
                        .add(6, 'M')
                        .format('YYYY-MM-DD');
                    break;
                case 'year':
                    dateEnd = moment(this.state.orderProduct.dateStart)
                        .add(1, 'y')
                        .format('YYYY-MM-DD');
                    break;
                case 'until_cancellation':
                    dateEnd = '';
                    break;
                default:
                    dateEnd = '';
            }
        }

        this.setState(
            {
                ...this.state,
                priceNumberOfDecimals: priceNumberOfDecimals,
                price: price,
                priceInclVat: priceInclVat,
                vatPercentage: vatPercentage,
                durationId: durationId,
                productHasVariablePrice: productHasVariablePrice === 'variable',
                productInputInclVat: productInputInclVat,
                orderProduct: {
                    ...this.state.orderProduct,
                    costCenterId: costCenterId,
                    description: description,
                    dateEnd: dateEnd,
                    variablePrice:
                        productHasVariablePrice === 'variable' ? this.state.orderProduct.variablePrice : null,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleSubmit = event => {
        event.preventDefault();

        const { orderProduct } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(orderProduct.productId + '')) {
            errors.productId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(orderProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }

        if (validator.isEmpty(orderProduct.dateStart + '')) {
            errors.dateStart = true;
            hasErrors = true;
        }

        if (validator.isEmpty(orderProduct.datePeriodStartFirstInvoice + '')) {
            errors.datePeriodStartFirstInvoice = true;
            hasErrors = true;
        }

        if (
            !validator.isEmpty(orderProduct.dateStart + '') &&
            moment(orderProduct.dateEnd).isSameOrBefore(moment(orderProduct.dateStart))
        ) {
            errors.dateEnd = true;
            hasErrors = true;
        }

        if (
            !validator.isEmpty(orderProduct.dateEnd + '') &&
            moment(orderProduct.dateStart).isSameOrAfter(moment(orderProduct.dateEnd))
        ) {
            errors.dateStart = true;
            hasErrors = true;
        }

        if (this.state.productHasVariablePrice) {
            if (validator.isEmpty(orderProduct.variablePrice + '') || orderProduct.variablePrice === null) {
                errors.variablePrice = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            OrderDetailsAPI.newOrderProduct(orderProduct).then(payload => {
                this.props.fetchOrderDetails(orderProduct.orderId);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {
            productId,
            description,
            costCenterId,
            amount,
            amountReduction,
            percentageReduction,
            dateStart,
            dateEnd,
            datePeriodStartFirstInvoice,
        } = this.state.orderProduct;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Order nummer'}
                                name={'orderId'}
                                value={this.props.orderDetails.number}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Product'}
                                id="productId"
                                name={'productId'}
                                options={this.props.products
                                    .filter(product => product.active)
                                    .sort((a, b) => a.name.localeCompare(b.name))}
                                value={productId}
                                onChangeAction={this.handleChangeProduct}
                                required={'required'}
                                error={this.state.errors.productId}
                            />
                        </div>
                        <div className="row">
                            <InputSelect
                                label={'Kostenplaats'}
                                id={'costCenterId'}
                                name={'costCenterId'}
                                options={this.props.costCenters}
                                optionName={'description'}
                                value={costCenterId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Omschrijving'}
                                id={'description'}
                                name={'description'}
                                value={description}
                                readOnly={true}
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
                            {this.state.productHasVariablePrice ? (
                                <InputText
                                    label={'Prijs excl. BTW'}
                                    name={'variablePrice'}
                                    type={'number'}
                                    // value={this.state.price}
                                    value={this.state.orderProduct.variablePrice}
                                    onChangeAction={this.handleInputChangeVariablePrice}
                                    onBlurAction={this.handleBlurVariablePrice}
                                    error={this.state.errors.variablePrice}
                                    required={this.state.productHasVariablePrice && 'required'}
                                />
                            ) : (
                                <InputText
                                    label={this.state.productInputInclVat ? 'Prijs incl. BTW' : 'Prijs excl. BTW'}
                                    name={'price'}
                                    value={
                                        this.state.productInputInclVat
                                            ? '€ ' +
                                              this.state.priceInclVat.toLocaleString('nl', {
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: this.state.priceNumberOfDecimals,
                                              })
                                            : '€ ' +
                                              this.state.price.toLocaleString('nl', {
                                                  minimumFractionDigits: 2,
                                                  maximumFractionDigits: this.state.priceNumberOfDecimals,
                                              })
                                    }
                                    readOnly={true}
                                />
                            )}
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

                        <div className="row">
                            <InputDate
                                label="Begin datum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeStartDate}
                                required={'required'}
                                error={this.state.errors.dateStart}
                            />
                            <InputDate
                                label="Eind datum"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.dateEnd}
                                readOnly={this.state.durationId === 'none'}
                            />
                        </div>

                        {this.state.durationId !== 'none' && (
                            <div className="row">
                                <InputDate
                                    label="1ste notaperiode start op"
                                    name="datePeriodStartFirstInvoice"
                                    value={datePeriodStartFirstInvoice}
                                    onChangeAction={this.handleInputChangeDate}
                                    error={this.state.errors.datePeriodStartFirstInvoice}
                                    required={'required'}
                                />
                            </div>
                        )}
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
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
        products: state.systemData.products,
        costCenters: state.systemData.costCenters,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: id => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormNew);
