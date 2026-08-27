import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import * as ibantools from 'ibantools';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelBody from '../../../../components/panel/PanelBody';
import Panel from '../../../../components/panel/Panel';
import OrderDetailsAPI from '../../../../api/order/OrderDetailsAPI';
import { connect } from 'react-redux';
import InputSelect from '../../../../components/form/InputSelect';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import InputDate from '../../../../components/form/InputDate';
import moment from 'moment';

// Functionele wrapper voor de class component
const OrderNewFormWrapper = props => {
    const navigate = useNavigate();
    return <OrderNewForm {...props} navigate={navigate} />;
};

class OrderNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            emailTemplates: [],
            participations: [],
            contactPerson: '',
            contactEmail: '',
            contactCollectMandate: false,
            contactCollectMandateFirstRun: null,
            collectMandateActive: false,
            order: {
                contactId: props.contactId || '',
                administrationId: props.administrationId || '',
                statusId: 'concept',
                subject: '',
                participationId: props.participationId || '',
                emailTemplateIdCollection: '',
                emailTemplateIdTransfer: '',
                emailTemplateReminderId: '',
                emailTemplateExhortationId: '',
                paymentTypeId: '',
                collectionFrequencyId: 'once',
                IBAN: '',
                ibanAttn: '',
                numberOfInvoiceReminders: '',
                poNumber: '',
                projectNumber: '',
                invoiceText: '',
                dateRequested: moment().format('YYYY-MM-DD'),
                dateStart: '',
                dateEnd: '',
                dateNextInvoice: moment().format('YYYY-MM-DD'),
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
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });

        this.state.order.contactId &&
            OrderDetailsAPI.fetchContactInfoForOrder(this.state.order.contactId).then(payload => {
                this.setState(
                    {
                        contactPerson: payload.data.contactPerson,
                        contactEmail: payload.data.email,
                        contactCollectMandate: payload.data.collectMandate,
                        contactCollectMandateFirstRun: payload.data.collectMandateFirstRun,
                        participations: payload.data.participations,
                    },
                    this.checkContactCollectMandate
                );
            });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({
                emailTemplates: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    emailTemplates: false,
                },
            });
        });

        this.handleAdministrationChange(this.state.order.administrationId);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            order: {
                ...this.state.order,
                [name]: value,
            },
        });
    };

    handleInputChangeAdministration = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.handleAdministrationChange(value);
    };

    handleAdministrationChange(administrationId) {
        let administration = null;
        if (administrationId) {
            administration = this.props.administrations.filter(administration => administration.id == administrationId);
            if (administration != null) {
                administration = administration[0];
            }
        }
        this.setState({
            order: {
                ...this.state.order,
                administrationId: administration != null ? administration.id : '',
                emailTemplateIdCollection:
                    administration && administration.emailTemplateIdCollection
                        ? administration.emailTemplateIdCollection
                        : '',
                emailTemplateIdTransfer:
                    administration && administration.emailTemplateIdTransfer
                        ? administration.emailTemplateIdTransfer
                        : '',
                emailTemplateReminderId:
                    administration && administration.emailTemplateReminderId
                        ? administration.emailTemplateReminderId
                        : '',
                emailTemplateExhortationId:
                    administration && administration.emailTemplateExhortationId
                        ? administration.emailTemplateExhortationId
                        : '',
            },
        });
    }

    handleInputChangeParticipation = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        let participation;

        participation = this.state.participations.filter(participation => participation.id == value);
        participation = participation[0];

        this.setState({
            order: {
                ...this.state.order,
                participationId: participation.id,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            order: {
                ...this.state.order,
                [name]: value,
            },
        });
    };
    handleInputChangeInvoiceDate = (value, name) => {
        this.setState(
            {
                order: {
                    ...this.state.order,
                    [name]: value,
                },
            },
            this.checkContactCollectMandate
        );
    };

    handleReactSelectContactIdChange(selectedOption, name) {
        OrderDetailsAPI.fetchContactInfoForOrder(selectedOption).then(payload => {
            this.setState(
                {
                    contactPerson: payload.data.contactPerson,
                    contactEmail: payload.data.email,
                    contactCollectMandate: payload.data.collectMandate,
                    contactCollectMandateFirstRun: payload.data.collectMandateFirstRun,
                    participations: payload.data.participations,
                    order: {
                        ...this.state.order,
                        [name]: selectedOption,
                    },
                },
                this.checkContactCollectMandate
            );
        });
    }

    checkContactCollectMandate = () => {
        let paymentTypeId = this.state.order.paymentTypeId;
        let date = this.state.order.dateNextInvoice;
        let contactCollectMandateFirstRun = this.state.contactCollectMandateFirstRun;
        let contactCollectMandate = this.state.contactCollectMandate;
        let collectMandateActive = contactCollectMandate == true;
        if (contactCollectMandate && contactCollectMandateFirstRun > date) {
            collectMandateActive = false;
        }
        if (!collectMandateActive) {
            paymentTypeId = 'transfer';
        } else {
            paymentTypeId = 'collection';
        }
        this.setState({
            collectMandateActive,
            order: {
                ...this.state.order,
                paymentTypeId,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            order: {
                ...this.state.order,
                [name]: selectedOption,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { order } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(order.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.administrationId + '')) {
            errors.administrationId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.paymentTypeId + '')) {
            errors.paymentTypeId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(order.subject + '')) {
            errors.subject = true;
            hasErrors = true;
        }

        this.setState({ errors });

        // If no errors send form
        if (!hasErrors) {
            OrderDetailsAPI.newOrder(order)
                .then(payload => {
                    this.props.navigate(`/order/${payload.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };

    render() {
        const {
            contactId,
            administrationId,
            statusId,
            subject,
            participationId,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            paymentTypeId,
            collectionFrequencyId,
            numberOfInvoiceReminders,
            poNumber,
            projectNumber,
            invoiceText,
            dateRequested,
            dateNextInvoice,
        } = this.state.order;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputReactSelect
                                label={'Order op naam van'}
                                name={'contactId'}
                                options={this.state.contacts}
                                value={Number(contactId)}
                                onChangeAction={this.handleReactSelectContactIdChange}
                                optionName={'fullName'}
                                isLoading={this.state.peekLoading.contacts}
                                error={this.state.errors.contactId}
                            />
                            <InputSelect
                                label={'Administratie'}
                                id="administrationId"
                                name={'administrationId'}
                                options={this.props.administrations}
                                value={administrationId}
                                onChangeAction={this.handleInputChangeAdministration}
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
                                label="Nota wordt gemaild naar"
                                value={this.state.contactEmail}
                                name={'contactEmail'}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Deelname'}
                                id="ParticipationId"
                                name={'ParticipationId'}
                                options={this.state.participations}
                                value={participationId}
                                onChangeAction={this.handleInputChangeParticipation}
                                optionValue={'id'}
                                optionName={'project_name'}
                            />
                            <InputText
                                label="Betreft"
                                name={'subject'}
                                value={subject}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.subject}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template nota incasso'}
                                name={'emailTemplateIdCollection'}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdCollection}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                            />
                            <InputSelect
                                label={'Betaalwijze'}
                                id="paymentTypeId"
                                name={'paymentTypeId'}
                                options={
                                    this.state.collectMandateActive
                                        ? this.props.orderPaymentTypes
                                        : this.props.orderPaymentTypes.filter(
                                              orderPaymentType => orderPaymentType.id === 'transfer'
                                          )
                                }
                                emptyOption={false}
                                value={paymentTypeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.paymentTypeId}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template nota overboeken'}
                                name={'emailTemplateIdTransfer'}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdTransfer}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                            />
                            <InputSelect
                                label={'Nota frequentie'}
                                id="collectionFrequencyId"
                                name={'collectionFrequencyId'}
                                options={this.props.orderCollectionFrequencies}
                                value={collectionFrequencyId}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template herinnering'}
                                name={'emailTemplateReminderId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateReminderId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                            />
                            <InputSelect
                                label={'Status'}
                                id="statusId"
                                name={'statusId'}
                                options={this.props.orderStatuses}
                                value={statusId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.statusId}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template aanmaning'}
                                name={'emailTemplateExhortationId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateExhortationId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                            />
                            <InputSelect
                                label={'Aantal keer herinneringen nota'}
                                id={'numberOfInvoiceReminders'}
                                size={'col-sm-6'}
                                name={'numberOfInvoiceReminders'}
                                options={[
                                    { id: '1', name: '1x' },
                                    { id: '2', name: '2x' },
                                    { id: '3', name: '3x' },
                                ]}
                                value={numberOfInvoiceReminders}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group" />
                            <InputText
                                label="Opdracht nummer klant"
                                name={'poNumber'}
                                value={poNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-sm-6 form-group" />
                            <InputText
                                label="Projectnummer"
                                name={'projectNumber'}
                                value={projectNumber}
                                maxLength={'25'}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="invoiceText" className="col-sm-12">
                                            Opmerking
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
                            <InputDate
                                label="Aanvraag datum"
                                name="dateRequested"
                                value={dateRequested}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputDate
                                label="Volgende nota datum"
                                name="dateNextInvoice"
                                value={dateNextInvoice}
                                onChangeAction={this.handleInputChangeInvoiceDate}
                            />
                        </div>
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
        orderStatuses: state.systemData.orderStatuses,
        orderPaymentTypes: state.systemData.orderPaymentTypes,
        orderCollectionFrequencies: state.systemData.orderCollectionFrequencies,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(OrderNewFormWrapper);
