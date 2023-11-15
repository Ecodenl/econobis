import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { updateOrder } from '../../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import * as ibantools from 'ibantools';
import InputSelect from '../../../../../components/form/InputSelect';
import EmailTemplateAPI from '../../../../../api/email-template/EmailTemplateAPI';
import InputDate from '../../../../../components/form/InputDate';
import InputReactSelect from '../../../../../components/form/InputReactSelect';
import moment from 'moment';
import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';

class OrderDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            contactId,
            statusId,
            subject,
            participationId,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            paymentTypeId,
            collectionFrequencyId,
            IBAN,
            ibanAttn,
            numberOfInvoiceReminders,
            poNumber,
            projectNumber,
            invoiceText,
            dateRequested,
            administrationId,
            dateNextInvoice,
        } = props.orderDetails;

        this.state = {
            emailTemplates: [],
            showExtraContactInfo: false,
            collectMandateActive: false,
            participations: [],
            order: {
                id,
                contactId: contactId ? contactId : '',
                statusId: statusId ? statusId : '',
                administrationId: administrationId ? administrationId : '',
                subject: subject ? subject : '',
                participationId: participationId ? participationId : '',
                emailTemplateIdCollection: emailTemplateIdCollection ? emailTemplateIdCollection : '',
                emailTemplateIdTransfer: emailTemplateIdTransfer ? emailTemplateIdTransfer : '',
                emailTemplateReminderId: emailTemplateReminderId ? emailTemplateReminderId : '',
                emailTemplateExhortationId: emailTemplateExhortationId ? emailTemplateExhortationId : '',
                paymentTypeId: paymentTypeId ? paymentTypeId : '',
                collectionFrequencyId: collectionFrequencyId ? collectionFrequencyId : 'once',
                IBAN: IBAN ? IBAN : '',
                ibanAttn: ibanAttn ? ibanAttn : '',
                numberOfInvoiceReminders: numberOfInvoiceReminders ? numberOfInvoiceReminders : '',
                poNumber: poNumber ? poNumber : '',
                projectNumber: projectNumber ? projectNumber : '',
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
    }

    componentDidMount() {
        this.state.order.contactId &&
            OrderDetailsAPI.fetchContactInfoForOrder(this.state.order.contactId).then(payload => {
                this.setState({
                    participations: payload.data.participations,
                });
            });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState(
                {
                    emailTemplates: payload,
                    peekLoading: {
                        ...this.state.peekLoading,
                        emailTemplates: false,
                    },
                },
                this.checkContactCollectMandate
            );
        });
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            order: {
                ...this.state.order,
                [name]: selectedOption,
            },
        });
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

    checkContactCollectMandate = () => {
        let paymentTypeId = this.state.order.paymentTypeId;
        let date = this.state.order.dateNextInvoice;
        if (!date) {
            date = moment().format('YYYY-MM-DD');
        }
        let contactCollectMandateFirstRun = this.props.contactCollectMandateFirstRun;
        let contactCollectMandate = this.props.contactCollectMandate;
        let collectMandateActive = contactCollectMandate == true;
        if (contactCollectMandate && contactCollectMandateFirstRun > date) {
            collectMandateActive = false;
        }
        if (!collectMandateActive) {
            paymentTypeId = 'transfer';
        }
        this.setState({
            collectMandateActive,
            order: {
                ...this.state.order,
                paymentTypeId,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { order } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

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

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            this.props.updateOrder(order, this.props.switchToView);
        }
    };

    render() {
        const {
            statusId,
            subject,
            participationId,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            paymentTypeId,
            collectionFrequencyId,
            IBAN,
            ibanAttn,
            numberOfInvoiceReminders,
            poNumber,
            projectNumber,
            invoiceText,
            dateRequested,
            administrationId,
            dateNextInvoice,
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
                            {invoiceCount > 0 ? (
                                <InputText
                                    label="Administratie"
                                    value={
                                        this.props.orderDetails.administration
                                            ? this.props.orderDetails.administration.name
                                            : ''
                                    }
                                    name={'administration'}
                                    readOnly={true}
                                />
                            ) : (
                                <InputSelect
                                    label={'Administratie'}
                                    name={'administrationId'}
                                    options={this.props.administrations}
                                    value={administrationId}
                                    onChangeAction={this.handleInputChange}
                                />
                            )}
                        </div>

                        <div className="row">
                            <InputText
                                label="Contact persoon"
                                value={this.props.contactPerson}
                                name={'contactPerson'}
                                readOnly={true}
                            />
                            <InputText
                                label="Nota wordt gemaild naar"
                                value={this.props.contactEmail}
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
                                value={dateNextInvoice}
                                name={'dateNextInvoice'}
                                onChangeAction={this.handleInputChangeInvoiceDate}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Totaal bedrag incl. BTW"
                                value={
                                    '€ ' +
                                    this.props.orderDetails.totalInclVatInclReductionPerYear.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                }
                                name={'totalInclVatInclReduction'}
                                readOnly={true}
                            />
                        </div>
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
            </form>
        );
    }
}

const mapStateToProps = state => {
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
