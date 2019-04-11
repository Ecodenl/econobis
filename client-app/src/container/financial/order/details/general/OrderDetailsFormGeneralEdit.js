import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import {updateOrder} from '../../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import * as ibantools from "ibantools";
import InputSelect from "../../../../../components/form/InputSelect";
import EmailTemplateAPI from "../../../../../api/email-template/EmailTemplateAPI";
import InputDate from "../../../../../components/form/InputDate";
import InputReactSelect from "../../../../../components/form/InputReactSelect";

class OrderDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id, statusId, subject, emailTemplateIdCollection, emailTemplateIdTransfer , emailTemplateReminderId, emailTemplateExhortationId, paymentTypeId, collectionFrequencyId, IBAN, ibanAttn,
            poNumber, invoiceText, dateRequested, administrationId, dateNextInvoice
        } = props.orderDetails;

        this.state = {
            emailTemplates: [],
            showExtraContactInfo: false,
            order: {
                id,
                statusId: statusId ? statusId : '',
                administrationId: administrationId ? administrationId : '',
                subject: subject ? subject : '',
                emailTemplateIdCollection: emailTemplateIdCollection ? emailTemplateIdCollection : '',
                emailTemplateIdTransfer: emailTemplateIdTransfer ? emailTemplateIdTransfer : '',
                emailTemplateReminderId: emailTemplateReminderId ? emailTemplateReminderId : '',
                emailTemplateExhortationId: emailTemplateExhortationId ? emailTemplateExhortationId : '',
                paymentTypeId: paymentTypeId ? paymentTypeId : '',
                collectionFrequencyId: collectionFrequencyId ? collectionFrequencyId : 'once',
                IBAN: IBAN ? IBAN : '',
                ibanAttn: ibanAttn ? ibanAttn : '',
                poNumber: poNumber ? poNumber : '',
                invoiceText: invoiceText ? invoiceText : '',
                dateRequested: dateRequested ? dateRequested : '',
                dateNextInvoice: dateNextInvoice ? dateNextInvoice : '',
            },
            errors: {
                statusId: false,
                subject: false,
                IBAN: false,
            },
            peekLoading: {
                emailTemplates: true,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    };

    componentWillMount() {
        EmailTemplateAPI.fetchEmailTemplatesPeek().then((payload) => {
            this.setState({
                emailTemplates: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    emailTemplates: false,
                },
            });
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: selectedOption
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: value
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {order} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(order.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.subject + '')) {
            errors.subject = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(order.IBAN + '')) {
            if (!ibantools.isValidIBAN(order.IBAN)) {
                errors.IBAN = true;
                hasErrors = true;
            }
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            this.props.updateOrder(order, this.props.switchToView);
        }
    };

    render() {
        const {
            statusId, subject, emailTemplateIdCollection, emailTemplateIdTransfer, emailTemplateReminderId, emailTemplateExhortationId, paymentTypeId, collectionFrequencyId, IBAN, ibanAttn,
            poNumber, invoiceText, dateRequested, administrationId, dateNextInvoice
        } = this.state.order;
        const { invoiceCount } = this.props.orderDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Order op naam van"
                                value={this.props.orderDetails.contact ? this.props.orderDetails.contact.fullName : ''}
                                name={'contact'}
                                readOnly={true}
                            />
                            {invoiceCount > 0 ?
                                <InputText
                                    label="Administratie"
                                    value={this.props.orderDetails.administration ? this.props.orderDetails.administration.name : ''}
                                    name={'administration'}
                                    readOnly={true}
                                />
                                :
                                <InputSelect
                                    label={"Administratie"}
                                    name={"administrationId"}
                                    options={this.props.administrations}
                                    value={administrationId}
                                    onChangeAction={this.handleInputChange}
                                />
                            }
                        </div>

                        <div className="row">
                            <InputText
                                label="Contact persoon"
                                value={this.props.contactPerson}
                                name={'contactPerson'}
                                readOnly={true}
                            />
                            <InputText
                                label="Factuur wordt gemaild naar"
                                value={this.props.contactEmail}
                                name={'contactEmail'}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={"E-mail template factuur incasso"}
                                name={"emailTemplateIdCollection"}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdCollection}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputText
                                label="Betreft"
                                name={"subject"}
                                value={subject}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.subject}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={"E-mail template factuur overboeken"}
                                name={"emailTemplateIdTransfer"}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdTransfer}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputSelect
                                label={"Betaalwijze"}
                                id="paymentTypeId"
                                name={"paymentTypeId"}
                                options={this.props.orderPaymentTypes}
                                value={paymentTypeId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label={"E-mail template herinnering"}
                                name={"emailTemplateReminderId"}
                                options={this.state.emailTemplates}
                                value={emailTemplateReminderId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputSelect
                                label={"Factuur frequentie"}
                                id="collectionFrequencyId"
                                name={"collectionFrequencyId"}
                                options={this.props.orderCollectionFrequencies}
                                value={collectionFrequencyId}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={"E-mail template aanmaning"}
                                name={"emailTemplateExhortationId"}
                                options={this.state.emailTemplates}
                                value={emailTemplateExhortationId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputSelect
                                label={"Status"}
                                id="statusId"
                                name={"statusId"}
                                options={this.props.orderStatuses}
                                value={statusId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.statusId}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Opdracht nummer klant"
                                name={"poNumber"}
                                value={poNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="invoiceText" className="col-sm-12">Opmerking</label>
                                    </div>
                                    <div className="col-sm-8">
                                <textarea name='invoiceText' value={invoiceText} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputDate
                                label="Aanvraag datum"
                                name="dateRequested"
                                value={dateRequested}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputDate
                                label="Volgende factuur datum"
                                value={dateNextInvoice}
                                name={'dateNextInvoice'}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Totaal bedrag incl. BTW"
                                value={"€" + this.props.orderDetails.totalPriceInclVatPerYear.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                name={'totalPriceInclVat'}
                                readOnly={true}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"}
                                        onClickAction={this.props.switchToView}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                        value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        orderStatuses: state.systemData.orderStatuses,
        orderPaymentTypes: state.systemData.orderPaymentTypes,
        orderCollectionFrequencies: state.systemData.orderCollectionFrequencies,
        orderDetails: state.orderDetails,
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    updateOrder: (order, switchToView) => {
        dispatch(updateOrder(order, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsFormGeneralEdit);
