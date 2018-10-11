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
import moment from "moment/moment";

class OrderDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id, statusId, subject, emailTemplateId, emailTemplateReminderId, emailTemplateExhortationId, paymentTypeId, collectionFrequencyId, IBAN, ibanAttn,
            poNumber, invoiceText, dateRequested, dateStart, dateEnd, administrationId
        } = props.orderDetails;

        this.state = {
            emailTemplates: [],
            showExtraContactInfo: false,
            order: {
                id,
                statusId: statusId ? statusId : '',
                administrationId: administrationId ? administrationId : '',
                subject: subject ? subject : '',
                emailTemplateId: emailTemplateId ? emailTemplateId : '',
                emailTemplateReminderId: emailTemplateReminderId ? emailTemplateReminderId : '',
                emailTemplateExhortationId: emailTemplateExhortationId ? emailTemplateExhortationId : '',
                paymentTypeId: paymentTypeId ? paymentTypeId : '',
                collectionFrequencyId: collectionFrequencyId ? collectionFrequencyId : '',
                IBAN: IBAN ? IBAN : '',
                ibanAttn: ibanAttn ? ibanAttn : '',
                poNumber: poNumber ? poNumber : '',
                invoiceText: invoiceText ? invoiceText : '',
                dateRequested: dateRequested ? dateRequested : '',
                dateStart: dateStart ? dateStart : '',
                dateEnd: dateEnd ? dateEnd : '',
            },
            errors: {
                statusId: false,
                subject: false,
                IBAN: false,
                dateStart: false,
                dateEnd: false,
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

        if (!validator.isEmpty(order.dateStart + '') && moment(order.dateEnd).isSameOrBefore(moment(order.dateStart))) {
            errors.dateEnd = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(order.dateEnd + '') && moment(order.dateStart).isSameOrAfter(moment(order.dateEnd))) {
            errors.dateStart = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if (!hasErrors) {
            this.props.updateOrder(order, this.props.switchToView);
        }
    };

    render() {
        const {
            statusId, subject, emailTemplateId, emailTemplateReminderId, emailTemplateExhortationId, paymentTypeId, collectionFrequencyId, IBAN, ibanAttn,
            poNumber, invoiceText, dateRequested, dateStart, dateEnd, administrationId
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
                                label="Contact persoon email"
                                value={this.props.contactEmail}
                                name={'contactEmail'}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
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
                                label={"E-mail template factuur"}
                                name={"emailTemplateId"}
                                options={this.state.emailTemplates}
                                value={emailTemplateId}
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
                            <InputText
                                label="Opdracht nummer klant"
                                name={"poNumber"}
                                value={poNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="IBAN"
                                name={"IBAN"}
                                value={IBAN}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.IBAN}
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
                            <InputText
                                label="Volgende factuur datum"
                                value={''}
                                name={'nextCollectionDate'}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Datum in"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.dateStart}
                            />
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
                        <div className="row">
                            <InputDate
                                label="Datum uit"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.dateEnd}
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
