import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputSelect from '../../../../components/form/InputSelect';
import ProductDetailsFormGeneralEditConfirm from './ProductDetailsFormGeneralEditConfirm';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import InputToggle from '../../../../components/form/InputToggle';

class ProductDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            code,
            name,
            invoiceText,
            durationId,
            invoiceFrequencyId,
            paymentTypeId,
            administrationId,
            ledgerId,
            costCenterId,
            active,
            cleanupException,
        } = props.productDetails;


        this.state = {
            //beter uit systemdata, maar sommige combinaties zijn niet mogelijk
            invoiceFrequencies: [{ id: 'once', name: 'Eenmalig' }],
            showConfirm: false,
            errorMessage: false,
            oldCode: code ? code : '',
            oldName: name ? name : '',
            product: {
                id,
                code: code ? code : '',
                name: name ? name : '',
                invoiceText: invoiceText ? invoiceText : '',
                durationId: durationId ? durationId : 'none',
                invoiceFrequencyId: invoiceFrequencyId ? invoiceFrequencyId : 'once',
                paymentTypeId: paymentTypeId ? paymentTypeId : '',
                administrationId: administrationId ? administrationId : '',
                ledgerId: ledgerId ? ledgerId : '',
                costCenterId: costCenterId ? costCenterId : '',
                active: active,
                cleanupException: cleanupException,
            },
            errors: {
                code: false,
                name: false,
                administrationId: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        let invoiceFrequencies = this.state.invoiceFrequencies;
        let invoiceFrequencyId = this.state.product.invoiceFrequencyId;

        switch (this.state.product.durationId) {
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
                invoiceFrequencyId,
            },
        });
    }

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

        if (productCodeNotUnique && product.code !== this.state.oldCode) {
            errorMessage = 'Productcode moet uniek zijn.';
            errors.code = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.code + '')) {
            errors.code = true;
            hasErrors = true;
        }

        let productNameNotUnique = false;
        this.props.products.map(
            existingProduct => existingProduct.name == product.name && (productNameNotUnique = true)
        );

        if (productNameNotUnique && product.name !== this.state.oldName) {
            errorMessage = 'Productnaam moet uniek zijn.';
            errors.name = true;
            hasErrors = true;
        }

        if (
            productCodeNotUnique &&
            productNameNotUnique &&
            product.code !== this.state.oldCode &&
            product.name !== this.state.oldName
        ) {
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

        if (!hasErrors) {
            this.toggleShowConfirm();
        }
    };

    toggleShowConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
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
            active,
            cleanupException,
        } = this.state.product;

        let ledgerOptions = this.props.ledgers;

        const { currentPrice } = this.props.productDetails;

        // If product has pricehistory ledgerOptions limited to same vat percentage ledgers
        if (this.props.usesTwinfield && currentPrice) {
            ledgerOptions = this.props.ledgers.filter(ledger => {
                if (!ledger.vatCode) {
                    return ledger.vatCode === currentPrice.vatPercentage;
                } else {
                    return ledger.vatCode.percentage === currentPrice.vatPercentage;
                }
            });
        }

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

                        {this.props.usesTwinfield ? (
                            <div className={'row'}>
                                <InputReactSelect
                                    label={'Grootboek'}
                                    name={'ledgerId'}
                                    options={ledgerOptions}
                                    optionName={'description'}
                                    value={Number(ledgerId)}
                                    onChangeAction={this.handleReactSelectChange}
                                />
                                <InputReactSelect
                                    label={'Kostenplaats'}
                                    name={'costCenterId'}
                                    options={this.props.costCenters}
                                    optionName={'description'}
                                    value={Number(costCenterId)}
                                    onChangeAction={this.handleReactSelectChange}
                                />
                            </div>
                        ) : null}

                        <div className={'row'}>
                            <InputToggle
                                label={'Actief'}
                                name={'active'}
                                value={active}
                                onChangeAction={event => {
                                    event.persist();
                                    this.handleInputChange(event);
                                }}
                            />

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
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
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
                {this.state.showConfirm && (
                    <ProductDetailsFormGeneralEditConfirm
                        product={this.state.product}
                        closeModal={this.toggleShowConfirm}
                        switchToView={this.props.switchToView}
                    />
                )}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        productDurations: state.systemData.productDurations,
        productInvoiceFrequencies: state.systemData.productInvoiceFrequencies,
        productPaymentTypes: state.systemData.productPaymentTypes,
        productDetails: state.productDetails,
        administrations: state.meDetails.administrations,
        products: state.systemData.products,
        ledgers: state.systemData.ledgers,
        costCenters: state.systemData.costCenters,
        usesTwinfield: state.systemData.usesTwinfield,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ProductDetailsFormGeneralEdit);
