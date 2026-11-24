import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import ProductDetailsAPI from '../../../api/product/ProductDetailsAPI';
import { connect } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import AdministrationsAPI from '../../../api/administration/AdministrationsAPI';
import InputReactSelect from '../../../components/form/InputReactSelect';
import InputToggle from '../../../components/form/InputToggle';

// Functionele wrapper voor de class component
const ProductNewFormWrapper = props => {
    const navigate = useNavigate();
    return <ProductNewForm {...props} navigate={navigate} />;
};

class ProductNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: false,
            //beter uit systemdata, maar sommige combinaties zijn niet mogelijk
            invoiceFrequencies: [{ id: 'once', name: 'Eenmalig' }],
            product: {
                code: '',
                name: '',
                invoiceText: '',
                durationId: 'none',
                invoiceFrequencyId: 'once',
                paymentTypeId: '',
                administrationId: '',
                ledgerId: '',
                costCenterId: '',
                cleanupException: false,
            },
            errors: {
                code: false,
                name: false,
                administrationId: false,
                ledgerId: false,
                costCenterId: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    handleInputChange = event => {
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

    handleInputChangeDuration = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let invoiceFrequencyId = this.state.product.invoiceFrequencyId;
        let invoiceFrequencies = this.state.invoiceFrequencies;

        switch (value) {
            case 'none':
                invoiceFrequencies = [{ id: 'once', name: 'Eenmalig' }];

                invoiceFrequencyId = 'once';
                break;
            case 'month':
                invoiceFrequencies = [
                    { id: 'once', name: 'Eenmalig' },
                    { id: 'monthly', name: 'Maand' },
                ];

                if (
                    invoiceFrequencyId === 'quarterly' ||
                    invoiceFrequencyId === 'yearly' ||
                    invoiceFrequencyId === 'half-year'
                ) {
                    invoiceFrequencyId = 'monthly';
                }
                break;
            case 'quarter':
                invoiceFrequencies = [
                    { id: 'once', name: 'Eenmalig' },
                    { id: 'monthly', name: 'Maand' },
                    { id: 'quarterly', name: 'Kwartaal' },
                ];
                if (invoiceFrequencyId === 'yearly' || invoiceFrequencyId === 'half-year') {
                    invoiceFrequencyId = 'quarterly';
                }
                break;
            case 'half_year':
                invoiceFrequencies = [
                    { id: 'once', name: 'Eenmalig' },
                    { id: 'monthly', name: 'Maand' },
                    { id: 'quarterly', name: 'Kwartaal' },
                    { id: 'half-year', name: 'Half jaar' },
                ];
                if (invoiceFrequencyId === 'yearly') {
                    invoiceFrequencyId = 'half-year';
                }
                break;
            default:
                invoiceFrequencies = [
                    { id: 'once', name: 'Eenmalig' },
                    { id: 'monthly', name: 'Maand' },
                    { id: 'quarterly', name: 'Kwartaal' },
                    { id: 'half-year', name: 'Half jaar' },
                    { id: 'yearly', name: 'Jaar' },
                ];
                break;
        }

        this.setState({
            ...this.state,
            invoiceFrequencies,
            product: {
                ...this.state.product,
                [name]: value,
                invoiceFrequencyId,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: selectedOption,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { product } = this.state;

        // Validation
        let errors = {};
        let errorMessage = false;
        let hasErrors = false;

        let productCodeNotUnique = false;
        this.props.products.map(
            existingProduct => existingProduct.code == product.code && (productCodeNotUnique = true)
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

        if (this.props.usesTwinfield) {
            if (validator.isEmpty(String(product.ledgerId))) {
                errors.ledgerId = true;
                hasErrors = true;
            }
        }

        let productNameNotUnique = false;
        this.props.products.map(
            existingProduct => existingProduct.name == product.name && (productNameNotUnique = true)
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

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        if (!hasErrors) {
            ProductDetailsAPI.newProduct(product)
                .then(payload => {
                    this.props.navigate(`/product/${payload.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };

    render() {
        const {
            code,
            name,
            invoiceText,
            durationId,
            invoiceFrequencyId,
            paymentTypeId,
            administrationId,
            ledgerId,
            costCenterId,
            cleanupException,
        } = this.state.product;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Productcode"
                                name={'code'}
                                value={code}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.code}
                            />
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="invoiceText" className="col-sm-12">
                                            Omschrijving
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea
                                            name="invoiceText"
                                            value={invoiceText}
                                            onChange={this.handleInputChange}
                                            className="form-control input-sm"
                                            maxLength="1000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Looptijd'}
                                id="durationId"
                                name={'durationId'}
                                options={this.props.productDurations}
                                value={durationId}
                                onChangeAction={this.handleInputChangeDuration}
                                emptyOption={false}
                            />
                            <InputSelect
                                label={'Prijs per'}
                                id="invoiceFrequencyId"
                                name={'invoiceFrequencyId'}
                                options={this.state.invoiceFrequencies}
                                value={invoiceFrequencyId}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Betaalwijze'}
                                id="paymentTypeId"
                                name={'paymentTypeId'}
                                options={this.props.productPaymentTypes}
                                value={paymentTypeId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={'Administratie'}
                                id="administrationId"
                                name={'administrationId'}
                                options={this.props.administrations}
                                value={administrationId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.administrationId}
                            />
                        </div>

                        <div className={'row'}>
                            <InputReactSelect
                                label={'Grootboek'}
                                name={'ledgerId'}
                                options={this.props.ledgers}
                                optionName={'description'}
                                value={ledgerId}
                                onChangeAction={this.handleReactSelectChange}
                                required={this.props.usesTwinfield ? 'required' : ''}
                                error={this.state.errors.ledgerId}
                            />
                            <InputReactSelect
                                label={'Kostenplaats'}
                                name={'costCenterId'}
                                options={this.props.costCenters}
                                optionName={'description'}
                                value={costCenterId}
                                onChangeAction={this.handleReactSelectChange}
                            />
                        </div>

                        <div className={'row'}>
                            {this.props.permissions.manageCleanupExceptionProducts ? (
                                <InputToggle
                                    label={'Uitzondering bij data opschonen'}
                                    name={'cleanupException'}
                                    value={cleanupException}
                                    onChangeAction={event => {
                                        event.persist();
                                        this.handleInputChange(event);
                                    }}
                                />
                            ) : (
                                <InputToggle
                                    label={'Uitzondering bij data opschonen'}
                                    name={cleanupException}
                                    value={cleanupException}
                                    readOnly={true}
                                    disabled={true}
                                />
                            )}
                        </div>

                        {this.state.errorMessage && (
                            <div className="col-sm-10 col-md-offset-1 alert alert-danger">
                                {this.state.errorMessage}
                            </div>
                        )}
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
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
        productDurations: state.systemData.productDurations,
        productPaymentTypes: state.systemData.productPaymentTypes,
        administrations: state.meDetails.administrations,
        products: state.systemData.products,
        ledgers: state.systemData.ledgers,
        costCenters: state.systemData.costCenters,
        usesTwinfield: state.systemData.usesTwinfield,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ProductNewFormWrapper);
