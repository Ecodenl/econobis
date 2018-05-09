import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../components/form/ViewText';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import moment from "moment/moment";

const InvoiceDetailsFormGeneralView = props => {

    const { status, dateRequested, paymentType, paymentTypeId, sendMethod, order, totalPriceInclVatAndReduction, dateSent, datePaymentDue, datePaid, dateReminder1, dateReminder2, dateReminder3, dateExhortation, dateCollection } = props.invoiceDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Contact"}
                            value={order.contact ? order.contact.fullName : ''}
                            link={order.contact ? 'contact/' + order.contact.id : ''}
                        />
                        <ViewText
                            label={"Status"}
                            value={status ? status.name : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Aanvraagdatum"}
                            value={dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Betaalwijze"}
                            value={paymentType ? paymentType.name : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Onderwerp"}
                            value={order ? order.subject : ''}
                        />
                        <ViewText
                            label={"Order"}
                            value={order ? order.number : ''}
                            link={order ? 'order/' + order.id : ''}
                        />
                    </div>

                    <div className="row margin-20-top margin-20-bottom">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">Factuurtekst</label>
                        </div>
                        <div className="col-sm-9" id="invoiceText">
                            {order ? order.invoiceText : ''}
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Prijs incl. BTW"}
                            value={ totalPriceInclVatAndReduction ? '€' + totalPriceInclVatAndReduction.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '€0,00'}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Factuur verstuurd"}
                            value={dateSent ? moment(dateSent).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Datum betaald"}
                            value={datePaid ? moment(datePaid).format('DD-MM-Y') : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Verzonden per"}
                            value={sendMethod ? sendMethod.name : ''}
                        />
                        {paymentTypeId === 'transfer' ?
                        <ViewText
                            label={"Uiterste betaaldatum"}
                            value={datePaymentDue ? moment(datePaymentDue).format('DD-MM-Y') : ''}
                        />
                            :
                        <ViewText
                            label={"Incasso datum"}
                            value={dateCollection ? moment(dateCollection).format('DD-MM-Y') : ''}
                        />}
                    </div>


                    <div className="row">
                        <ViewText
                            label={"Herinnering 1 verstuurd"}
                            value={dateReminder1 ? moment(dateReminder1).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Herinnering 2 verstuurd"}
                            value={dateReminder2 ? moment(dateReminder2).format('DD-MM-Y') : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Herinnering 3 verstuurd"}
                            value={dateReminder3 ? moment(dateReminder3).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Aanmaning verstuurd"}
                            value={dateExhortation ? moment(dateExhortation).format('DD-MM-Y') : ''}
                        />
                    </div>


                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps)(InvoiceDetailsFormGeneralView);