import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { updateProduct } from '../../../../actions/product/ProductDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import InputSelect from "../../../../components/form/InputSelect";
import AdministrationsAPI from "../../../../api/administration/AdministrationsAPI";

class ProductDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, code, name, invoiceText, durationId, invoiceFrequencyId, paymentTypeId, administrationId} = props.productDetails;

        this.state = {
            administrations: [],
            product: {
                id,
                code: code ? code : '',
                name: name ? name : '',
                invoiceText: invoiceText ? invoiceText : '',
                durationId: durationId ? durationId : '',
                invoiceFrequencyId: invoiceFrequencyId ? invoiceFrequencyId : '',
                paymentTypeId: paymentTypeId ? paymentTypeId : '',
                administrationId: administrationId ? administrationId : '',
            },
            errors: {
                code: false,
                name: false,
                administrationId: false,
            },
        };
    };

    componentDidMount() {
        AdministrationsAPI.peekAdministrations().then(payload => {
            this.setState({
                ...this.state,
                administrations: payload,
            })
        })
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {product} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(product.code + '')) {
            errors.code = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.name + '')) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.administrationId + '')) {
            errors.administrationId = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        if (!hasErrors) {
            this.props.updateProduct(product, this.props.switchToView);
        }
    };

    render() {
        const { code, name, invoiceText, durationId, invoiceFrequencyId, paymentTypeId, administrationId} = this.state.product;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Productcode"
                                name={"code"}
                                value={code}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.code}
                            />
                            <InputText
                                label="Naam"
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.name}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="invoiceText" className="col-sm-12">Omschrijving</label>
                                    </div>
                                    <div className="col-sm-8">
                                <textarea name='invoiceText' value={invoiceText} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Looptijd"}
                                id="durationId"
                                name={"durationId"}
                                options={this.props.productDurations}
                                value={durationId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={"Factuur frequentie"}
                                id="invoiceFrequencyId"
                                name={"invoiceFrequencyId"}
                                options={this.props.productInvoiceFrequencies}
                                value={invoiceFrequencyId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Betaalwijze"}
                                id="paymentTypeId"
                                name={"paymentTypeId"}
                                options={this.props.productPaymentTypes}
                                value={paymentTypeId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={"Administratie"}
                                id="administrationId"
                                name={"administrationId"}
                                options={this.state.administrations}
                                value={administrationId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.administrationId}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        productDurations: state.systemData.productDurations,
        productInvoiceFrequencies: state.systemData.productInvoiceFrequencies,
        productPaymentTypes: state.systemData.productPaymentTypes,
        productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateProduct: (product, switchToView) => {
        dispatch(updateProduct(product, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsFormGeneralEdit);
