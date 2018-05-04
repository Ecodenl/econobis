import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';
import * as ibantools from "ibantools";

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelBody from "../../../../components/panel/PanelBody";
import Panel from "../../../../components/panel/Panel";
import OrderDetailsAPI from '../../../../api/order/OrderDetailsAPI';
import {connect} from "react-redux";
import InputSelect from "../../../../components/form/InputSelect";
import ContactsAPI from "../../../../api/contact/ContactsAPI";
import EmailTemplateAPI from "../../../../api/email-template/EmailTemplateAPI";
import InputReactSelect from "../../../../components/form/InputReactSelect";
import InputDate from "../../../../components/form/InputDate";
import moment from 'moment';

moment.locale('nl');

class OrderNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            emailTemplates: [],
            contactPerson: '',
            contactEmail: '',
            order: {
                contactId: props.contactId || '',
                administrationId: '',
                statusId: 'concept',
                subject: '',
                emailTemplateId: '',
                emailTemplateReminderId: '',
                emailTemplateExhortationId: '',
                paymentTypeId: 'collection',
                collectionFrequencyId: '',
                IBAN: '',
                ibanAttn: '',
                poNumber: '',
                invoiceText: '',
                dateRequested: moment(),
                dateStart: '',
                dateEnd: '',
            },
            errors: {
                contactId: false,
                administrationId: false,
                statusId: false,
                subject: false,
                IBAN: false,
            },
            peekLoading: {
                contacts: true,
                emailTemplates: true,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.handleReactSelectContactIdChange = this.handleReactSelectContactIdChange.bind(this);
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });

        this.state.order.contactId &&
        OrderDetailsAPI.fetchContactInfoForOrder(this.state.order.contactId).then((payload) => {
            this.setState({
                ...this.state,
                contactPerson: payload.data.contactPerson,
                contactEmail: payload.data.email,
            });
        });

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

    handleReactSelectContactIdChange (selectedOption, name) {

        OrderDetailsAPI.fetchContactInfoForOrder(selectedOption).then((payload) => {
            this.setState({
                ...this.state,
                contactPerson: payload.data.contactPerson,
                contactEmail: payload.data.email,
            });
        });

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: selectedOption
            },
        });
    };

    handleReactSelectChange (selectedOption, name) {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: selectedOption
            },
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const {order} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(order.contactId)) {
            errors.contactId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.statusId)) {
            errors.statusId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.subject)) {
            errors.subject = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(order.IBAN)) {
            if (!ibantools.isValidIBAN(order.IBAN)) {
                errors.IBAN = true;
                hasErrors = true;
            }
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            OrderDetailsAPI.newOrder(order).then((payload) => {
                hashHistory.push(`/order/${payload.data.id}`);
            }).catch(function (error) {
                console.log(error)
            });
        }
    };

    render() {
        const { contactId, administrationId, statusId, subject, emailTemplateId, emailTemplateReminderId, emailTemplateExhortationId, paymentTypeId, collectionFrequencyId, IBAN, ibanAttn,
            poNumber, invoiceText, dateRequested, dateStart, dateEnd } = this.state.order;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputReactSelect
                                label={"Order op naam van"}
                                name={"contactId"}
                                options={this.state.contacts}
                                value={contactId}
                                onChangeAction={this.handleReactSelectContactIdChange}
                                optionName={'fullName'}
                                isLoading={this.state.peekLoading.contacts}
                                multi={false}
                                error={this.state.errors.contactId}
                            />
                            <InputSelect
                                label={"Administratie"}
                                id="administrationId"
                                name={"administrationId"}
                                options={this.props.administrations}
                                value={administrationId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.administrationId}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Contact persoon"
                                value={this.state.contactPerson}
                                name={'contactPerson'}
                                readOnly={true}
                            />
                            <InputText
                                label="Contact persoon email"
                                value={this.state.contactEmail}
                                name={'contactEmail'}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={"E-mail template factuur"}
                                name={"emailTemplateId"}
                                options={this.state.emailTemplates}
                                value={emailTemplateId}
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
                            <InputReactSelect
                                label={"E-mail template herinnering"}
                                name={"emailTemplateReminderId"}
                                options={this.state.emailTemplates}
                                value={emailTemplateReminderId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputText
                                label="Onderwerp"
                                name={"subject"}
                                value={subject}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.subject}
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
                                label={"Betaalwijze"}
                                id="paymentTypeId"
                                name={"paymentTypeId"}
                                options={this.props.orderPaymentTypes}
                                value={paymentTypeId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Incasso frequentie"}
                                id="collectionFrequencyId"
                                name={"collectionFrequencyId"}
                                options={this.props.orderCollectionFrequencies}
                                value={collectionFrequencyId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="IBAN"
                                name={"IBAN"}
                                value={IBAN}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.IBAN}
                            />

                        </div>

                        <div className="row">
                            <InputText
                                label="PO nummer van de klant"
                                name={"poNumber"}
                                value={poNumber}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="IBAN t.n.v."
                                name={"ibanAttn"}
                                value={ibanAttn}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="invoiceText" className="col-sm-12">Opmerking op de factuur</label>
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
                                label="Begin datum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Eind datum"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>

                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
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
        orderStatuses: state.systemData.orderStatuses,
        orderPaymentTypes: state.systemData.orderPaymentTypes,
        orderCollectionFrequencies: state.systemData.orderCollectionFrequencies,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(OrderNewForm);
