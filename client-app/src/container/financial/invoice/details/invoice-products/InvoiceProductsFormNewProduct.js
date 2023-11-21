import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceDetailsAPI from '../../../../../api/invoice/InvoiceDetailsAPI';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from 'validator';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';
import { fetchInvoiceDetails } from '../../../../../actions/invoice/InvoiceDetailsActions';
import InputReactSelect from '../../../../../components/form/InputReactSelect';

class InvoiceProductsFormNewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatPercentages: [
                { id: '0', name: '0' },
                { id: '9', name: '9' },
                { id: '21', name: '21' },
            ],
            errorMessage: false,
            price: '0',
            totalPrice: '0',
            invoiceProduct: {
                invoiceId: this.props.invoiceDetails.id,
                description: '',
                amount: 1,
                amountReduction: 0,
                percentageReduction: 0,
                dateLastInvoice: moment().format('YYYY-MM-DD'),
            },
            product: {
                code: '',
                name: '',
                durationId: 'none',
                administrationId: this.props.invoiceDetails.order.administrationId,
                invoiceFrequencyId: 'once',
                vatPercentage: '',
                price: '',
                isOneTime: false,
                ledgerId: '',
            },
            errors: {
                amount: false,
                dateLastInvoice: false,
                description: false,
                code: false,
                name: false,
                price: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: selectedOption,
            },
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                invoiceProduct: {
                    ...this.state.invoiceProduct,
                    [name]: value,
                },
            },
            this.updatePrice
        );
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

    handleInputChangeProductPrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let price;

        if (this.state.vatPercentage && this.state.vatPercentage.id == '6') {
            price = value * 1.06;
        } else if (this.state.vatPercentage && this.state.vatPercentage.id == '9') {
            price = value * 1.09;
        } else if (this.state.vatPercentage && this.state.vatPercentage.id == '21') {
            price = value * 1.21;
        } else {
            price = value;
        }

        this.setState(
            {
                ...this.state,
                price: price,
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

        let price;

        if (value == '6') {
            price = this.state.product.price * 1.06;
        } else if (value == '9') {
            price = this.state.product.price * 1.09;
        } else if (value == '21') {
            price = this.state.product.price * 1.21;
        } else {
            price = this.state.product.price;
        }

        this.setState(
            {
                ...this.state,
                price: price,
                product: {
                    ...this.state.product,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    updatePrice = () => {
        let price = validator.isFloat(this.state.price + '') ? this.state.price : 0;
        let amount = validator.isFloat(this.state.invoiceProduct.amount + '') ? this.state.invoiceProduct.amount : 0;
        let percentageReduction = validator.isFloat(this.state.invoiceProduct.percentageReduction + '')
            ? this.state.invoiceProduct.percentageReduction
            : 0;
        let amountReduction = validator.isFloat(this.state.invoiceProduct.amountReduction + '')
            ? this.state.invoiceProduct.amountReduction
            : 0;

        let totalPrice = 0;

        if (price < 0) {
            const reduction = parseFloat(100) + parseFloat(percentageReduction);
            totalPrice = price * amount * (reduction / 100) - amountReduction;
        } else {
            totalPrice = price * amount * ((100 - percentageReduction) / 100) - amountReduction;
        }

        this.setState({
            ...this.state,
            price: parseFloat(price).toFixed(2),
            totalPrice: parseFloat(totalPrice).toFixed(2),
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            invoiceProduct: {
                ...this.state.invoiceProduct,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { invoiceProduct } = this.state;

        let errors = {};
        let hasErrors = false;
        let errorMessage = false;

        if (validator.isEmpty(invoiceProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }
        if (validator.isEmpty(invoiceProduct.dateLastInvoice + '')) {
            errors.dateLastInvoice = true;
            hasErrors = true;
        }
        if (validator.isEmpty(invoiceProduct.description + '')) {
            errors.description = true;
            hasErrors = true;
        }
        const { product } = this.state;

        let productCodeNotUnique = false;
        this.props.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
                existingProduct =>
                    existingProduct.code === product.code && (productCodeNotUnique = true) && existingProduct.active
            );

        if (productCodeNotUnique) {
            errorMessage = 'Productcode moet uniek zijn.';
            errors.code = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.code + '')) {
            errors.code = true;
            hasErrors = true;
        }

        let productNameNotUnique = false;
        this.props.products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
                existingProduct =>
                    existingProduct.name === product.name && (productNameNotUnique = true) && existingProduct.active
            );

        if (productNameNotUnique) {
            errorMessage = 'Productnaam moet uniek zijn.';
            errors.name = true;
            hasErrors = true;
        }

        if (productCodeNotUnique && productNameNotUnique) {
            errorMessage = 'Productcode en productnaam moeten uniek zijn.';
        }

        if (validator.isEmpty(product.name + '')) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.administrationId + '')) {
            errors.administrationId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.price + '')) {
            errors.price = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            InvoiceDetailsAPI.newProductAndInvoiceProduct(invoiceProduct, product).then(payload => {
                this.props.fetchInvoiceDetails(invoiceProduct.invoiceId);
                this.props.toggleShowNewProduct();
            });
    };

    render() {
        const {
            description,
            amount,
            amountReduction,
            percentageReduction,
            dateLastInvoice,
        } = this.state.invoiceProduct;
        const { code, name, vatPercentage, price, ledgerId } = this.state.product;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <div className={'panel-heading'}>
                                <span className={'h5 text-bold'}>Product</span>
                            </div>
                        </div>
                        <div className="row">
                            <InputText
                                label="Productcode"
                                name={'code'}
                                value={code}
                                onChangeAction={this.handleInputChangeProduct}
                                required={'required'}
                                error={this.state.errors.code}
                            />
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChangeProduct}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Prijs ex. BTW'}
                                id={'price'}
                                name={'price'}
                                type={'number'}
                                min={'0'}
                                max={'1000000'}
                                value={price}
                                onChangeAction={this.handleInputChangeProductPrice}
                                required={'required'}
                                error={this.state.errors.price}
                            />
                            <InputSelect
                                label={'BTW percentage'}
                                name={'vatPercentage'}
                                options={this.state.vatPercentages}
                                value={vatPercentage}
                                onChangeAction={this.handleInputChangeProductVat}
                                placeholder={'Geen'}
                            />
                        </div>

                        {this.props.invoiceDetails.order.administration.usesTwinfield == true &&
                            this.props.invoiceDetails.order.administration.twinfieldIsValid == true && (
                                <div className="row">
                                    <InputReactSelect
                                        label={'Grootboek'}
                                        name={'ledgerId'}
                                        options={this.props.ledgers}
                                        optionName={'description'}
                                        value={ledgerId}
                                        onChangeAction={this.handleReactSelectChange}
                                    />
                                </div>
                            )}

                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Notaregel</span>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={'Omschrijving'}
                                id={'description'}
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
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
                                label={'Bedrag'}
                                name={'price'}
                                value={
                                    '€ ' +
                                    this.state.price.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
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
                                label={'Totaalbedrag'}
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
                                name="dateLastInvoice"
                                value={dateLastInvoice}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.dateLastInvoice}
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
                                onClickAction={this.props.toggleShowNewProduct}
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
        invoiceDetails: state.invoiceDetails,
        administrationId: state.administrationDetails.id,
        productDurations: state.systemData.productDurations,
        productInvoiceFrequencies: state.systemData.productInvoiceFrequencies,
        productPaymentTypes: state.systemData.productPaymentTypes,
        products: state.systemData.products,
        ledgers: state.systemData.ledgers,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProductsFormNewProduct);
