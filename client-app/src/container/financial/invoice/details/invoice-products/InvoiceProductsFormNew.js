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

class InvoiceProductsFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: '0',
            totalPrice: '0',
            productHasVariablePrice: false,
            invoiceProduct: {
                invoiceId: this.props.invoiceDetails.id,
                productId: '',
                description: '',
                amount: 1,
                amountReduction: 0,
                percentageReduction: 0,
                dateLastInvoice: moment().format('YYYY-MM-DD'),
                variablePrice: 0,
            },
            errors: {
                productId: false,
                amount: false,
                dateLastInvoice: false,
                description: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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

    handleInputChangeVariablePrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                price: value,
                invoiceProduct: {
                    ...this.state.invoiceProduct,
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
            totalPrice: totalPrice,
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

    handleChangeProduct = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let productHasVariablePrice = '';

        let price = 0;
        let description = '';

        if (value) {
            let product = this.props.products.filter(product => product.id == value);
            price = product[0].priceInclVat;
            description = product[0].invoiceText;
            productHasVariablePrice = product[0].hasVariablePrice;
        }

        this.setState(
            {
                ...this.state,
                price: price,
                productHasVariablePrice: productHasVariablePrice === 'variable',
                invoiceProduct: {
                    ...this.state.invoiceProduct,
                    description: description,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleSubmit = event => {
        event.preventDefault();

        const { invoiceProduct } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(invoiceProduct.productId + '')) {
            errors.productId = true;
            hasErrors = true;
        }
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
        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            InvoiceDetailsAPI.newInvoiceProduct(invoiceProduct).then(payload => {
                this.props.fetchInvoiceDetails(invoiceProduct.invoiceId);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {
            productId,
            description,
            amount,
            amountReduction,
            percentageReduction,
            dateLastInvoice,
        } = this.state.invoiceProduct;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Order nummer'}
                                name={'orderId'}
                                value={this.props.invoiceDetails.number}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Product'}
                                id="productId"
                                name={'productId'}
                                options={this.props.products}
                                value={productId}
                                onChangeAction={this.handleChangeProduct}
                                required={'required'}
                                error={this.state.errors.productId}
                            />
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
                            {this.state.productHasVariablePrice ? (
                                <InputText
                                    label={'Prijs ex. BTW'}
                                    type={'number'}
                                    name={'variablePrice'}
                                    value={this.state.price}
                                    onChangeAction={this.handleInputChangeVariablePrice}
                                />
                            ) : (
                                <InputText
                                    label={'Prijs excl. BTW'}
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
        invoiceDetails: state.invoiceDetails,
        products: state.systemData.products,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProductsFormNew);
