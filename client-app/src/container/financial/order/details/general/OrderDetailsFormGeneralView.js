import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../components/form/ViewText';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import moment from "moment/moment";

const OrderDetailsFormGeneralView = props => {

    const { contact, administration, status, subject, emailTemplate, emailTemplateReminder, emailTemplateExhortation, paymentType, collectionFrequency, IBAN, ibanAttn,
        poNumber, invoiceText, dateRequested, dateStart, dateEnd, totalPriceInclVat } = props.orderDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Order op naam van"}
                            value={contact ? contact.fullName : ''}
                            link={contact ? 'contact/' + contact.id : ''}
                        />
                        <ViewText
                            label={"Administratie"}
                            value={administration.name}
                            link={administration ? 'administratie/' + administration.id : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label="Contact persoon"
                            value={props.contactPerson}
                        />
                        <ViewText
                            label="Contact persoon email"
                            value={props.contactEmail}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Status"}
                            value={status ? status.name : ''}
                        />
                        <ViewText
                            label={"Onderwerp"}
                            value={subject ? subject : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"E-mail template factuur"}
                            value={emailTemplate ? emailTemplate.name : ''}
                        />
                        <ViewText
                            label={"Betaalwijze"}
                            value={paymentType ? paymentType.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"E-mail template herinnering"}
                            value={emailTemplateReminder ? emailTemplateReminder.name : ''}
                        />
                        <ViewText
                            label={"Incasso frequentie"}
                            value={collectionFrequency ? collectionFrequency.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"E-mail template aanmaning"}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={"PO nummer van de klant"}
                            value={poNumber}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"IBAN"}
                            value={IBAN}
                        />
                        <ViewText
                            label={"IBAN t.n.v"}
                            value={ibanAttn}
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">Factuurtekst</label>
                        </div>
                        <div className="col-sm-9" id="invoiceText">
                            {invoiceText}
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Aanvraag datum"}
                            value={ dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Volgende incasso datum"}
                            value={''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Begin datum"}
                            value={ dateStart ? moment(dateStart).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={"Totaal bedrag incl. BTW"}
                            value={"€" + totalPriceInclVat.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Eind datum"}
                            value={ dateEnd ? moment(dateEnd).format('DD-MM-Y') : ''}
                        />
                    </div>


                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsFormGeneralView);