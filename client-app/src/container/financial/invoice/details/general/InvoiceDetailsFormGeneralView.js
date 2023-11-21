import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment/moment';

const InvoiceDetailsFormGeneralView = props => {
    const {
        status,
        dateRequested,
        paymentType,
        paymentTypeId,
        invoiceText,
        subject,
        order,
        totalInclVatInclReduction,
        amountOpen,
        dateSent,
        datePaymentDue,
        datePaid,
        paymentReference,
        dateReminder1,
        dateReminder2,
        dateReminder3,
        dateExhortation,
        emailReminder1,
        emailReminder2,
        emailReminder3,
        emailExhortation,
        dateCollection,
        emailedTo,
        sentToName,
        isPaidByMollie,
    } = props.invoiceDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Contact'}
                            value={order.contact ? order.contact.fullName : ''}
                            link={order.contact ? 'contact/' + order.contact.id : ''}
                        />
                        <ViewText label={'Status'} value={status ? status.name : ''} />
                    </div>

                    {status && status.id === 'sent' && isPaidByMollie && (
                        <div className="row">
                            <ViewText />
                            <ViewText label={'Substatus'} value="Mollie betaald" />
                        </div>
                    )}

                    <div className="row">
                        <ViewText label={'Betaalwijze'} value={paymentType ? paymentType.name : ''} />
                        <ViewText label={'Betreft'} value={subject ? subject : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Order'}
                            value={order ? order.number : ''}
                            link={order ? 'order/' + order.id : ''}
                        />
                    </div>

                    <div className="row margin-20-top margin-20-bottom">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">
                                Opmerking
                            </label>
                        </div>
                        <div className="col-sm-9" id="invoiceText">
                            {invoiceText ? invoiceText : ''}
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Bedrag incl. BTW'}
                            value={
                                totalInclVatInclReduction
                                    ? '€ ' +
                                      totalInclVatInclReduction.toLocaleString('nl', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                      })
                                    : '€ 0,00'
                            }
                        />
                        <ViewText
                            label={'Openstaand bedrag'}
                            value={
                                amountOpen
                                    ? '€ ' +
                                      amountOpen.toLocaleString('nl', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                      })
                                    : '€ 0,00'
                            }
                        />
                    </div>

                    <div className="row">
                        {dateSent ? (
                            <ViewText label={'Nota datum'} value={dateSent ? moment(dateSent).format('DD-MM-Y') : ''} />
                        ) : (
                            <ViewText
                                label={'Geplande nota datum'}
                                value={dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}
                            />
                        )}
                    </div>

                    <div className="row">
                        <ViewText label={'Verstuurd naar'} value={sentToName ? sentToName : ''} />
                        <ViewText label={'Verstuurd naar e-mail'} value={emailedTo ? emailedTo : ''} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Herinnering 1 verstuurd'}
                            value={dateReminder1 ? moment(dateReminder1).format('DD-MM-Y') : ''}
                        />
                        <ViewText label={'E-mail herinnering 1'} value={emailReminder1 ? emailReminder1 : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Herinnering 2 verstuurd'}
                            value={dateReminder2 ? moment(dateReminder2).format('DD-MM-Y') : ''}
                        />
                        <ViewText label={'E-mail herinnering 2'} value={emailReminder2 ? emailReminder2 : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Herinnering 3 verstuurd'}
                            value={dateReminder3 ? moment(dateReminder3).format('DD-MM-Y') : ''}
                        />
                        <ViewText label={'E-mail herinnering 3'} value={emailReminder3 ? emailReminder3 : ''} />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Aanmaning verstuurd'}
                            value={dateExhortation ? moment(dateExhortation).format('DD-MM-Y') : ''}
                        />
                        <ViewText label={'E-mail aanmaning'} value={emailExhortation ? emailExhortation : ''} />
                    </div>

                    <div className="row">
                        {paymentTypeId === 'transfer' ? (
                            <ViewText
                                label={'Uiterste betaaldatum'}
                                value={datePaymentDue ? moment(datePaymentDue).format('DD-MM-Y') : ''}
                            />
                        ) : (
                            <ViewText
                                label={'Incasso datum'}
                                value={dateCollection ? moment(dateCollection).format('DD-MM-Y') : ''}
                            />
                        )}
                        <ViewText label={'Datum betaald'} value={datePaid ? moment(datePaid).format('DD-MM-Y') : ''} />
                    </div>
                    <div className="row">
                        <ViewText label={'Betalingskenmerk'} value={paymentReference ? paymentReference : ''} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps)(InvoiceDetailsFormGeneralView);
