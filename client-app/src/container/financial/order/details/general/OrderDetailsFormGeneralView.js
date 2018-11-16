import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../components/form/ViewText';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import moment from "moment/moment";

const OrderDetailsFormGeneralView = props => {

    const { contact, administration, status, subject, emailTemplateCollection, emailTemplateTransfer, emailTemplateReminder, emailTemplateExhortation, paymentType, collectionFrequency, IBAN, ibanAttn,
        poNumber, invoiceText, dateRequested, totalPriceInclVatPerYear, dateNextInvoice } = props.orderDetails;

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
                            label={"E-mail template factuur incasso"}
                            value={emailTemplateCollection ? emailTemplateCollection.name : ''}
                        />
                        <ViewText
                            label={"Betreft"}
                            value={subject ? subject : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"E-mail template factuur overboeken"}
                            value={emailTemplateTransfer ? emailTemplateTransfer.name : ''}
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
                            label={"Factuur frequentie"}
                            value={collectionFrequency ? collectionFrequency.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"E-mail template aanmaning"}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={"Status"}
                            value={status ? status.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"IBAN"}
                            value={IBAN}
                        />
                        <ViewText
                            label={"Opdracht nummer klant"}
                            value={poNumber}
                        />
                    </div>


                    <div className="row">
                        <ViewText
                            label={"IBAN t.n.v."}
                            value={ibanAttn}
                        />
                    </div>


                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">Opmerking</label>
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
                            label={"Volgende factuur datum"}
                            value={ dateNextInvoice ? moment(dateNextInvoice).format('DD-MM-Y') : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Totaal bedrag incl. BTW"}
                            value={"€" + totalPriceInclVatPerYear.toLocaleString('nl',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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