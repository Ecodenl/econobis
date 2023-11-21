import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';

const OrderDetailsFormGeneralView = props => {
    const {
        contact,
        project,
        administration,
        status,
        subject,
        emailTemplateCollection,
        emailTemplateTransfer,
        emailTemplateReminder,
        emailTemplateExhortation,
        paymentType,
        collectionFrequency,
        IBAN,
        ibanAttn,
        numberOfInvoiceReminders,
        poNumber,
        projectNumber,
        invoiceText,
        dateRequested,
        totalInclVatInclReductionPerYear,
        dateNextInvoice,
    } = props.orderDetails;

    let onclickAction;
    if (status.id == 'in-progress') {
        onclickAction = null;
    } else {
        onclickAction = props.switchToEdit;
    }

    return (
        <div onClick={onclickAction}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Order op naam van'}
                            value={contact ? contact.fullName : ''}
                            link={contact ? 'contact/' + contact.id : ''}
                        />
                        <ViewText
                            label={'Administratie'}
                            value={administration.name}
                            link={administration ? 'administratie/' + administration.id : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText label="Contact persoon" value={props.contactPerson} />
                        <ViewText label="Nota wordt gemaild naar" value={props.contactEmail} />
                    </div>
                    <div className="row">
                        <ViewText label={'Deelname'} value={project ? project.name : ''} />
                        <ViewText label={'Betreft'} value={subject ? subject : ''} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E-mail template nota incasso'}
                            value={emailTemplateCollection ? emailTemplateCollection.name : ''}
                        />
                        <ViewText label={'Betaalwijze'} value={paymentType ? paymentType.name : ''} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E-mail template nota overboeken'}
                            value={emailTemplateTransfer ? emailTemplateTransfer.name : ''}
                        />
                        <ViewText
                            label={'Nota frequentie'}
                            value={collectionFrequency ? collectionFrequency.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E-mail template herinnering'}
                            value={emailTemplateReminder ? emailTemplateReminder.name : ''}
                        />
                        <ViewText label={'Status'} value={status ? status.name : ''} />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'E-mail template aanmaning'}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={'Aantal keer herinneringen nota'}
                            value={
                                numberOfInvoiceReminders === 1
                                    ? '1x'
                                    : numberOfInvoiceReminders === 2
                                    ? '2x'
                                    : numberOfInvoiceReminders === 3
                                    ? '3x'
                                    : ''
                            }
                        />
                    </div>
                    <div className="row">
                        <div className="col-sm-6" />
                        <ViewText label={'Opdracht nummer klant'} value={poNumber} />
                    </div>
                    <div className="row">
                        <div className="col-sm-6" />
                        <ViewText label={'Projectnummer'} value={projectNumber} />
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">
                                Opmerking
                            </label>
                        </div>
                        <div className="col-sm-9" id="invoiceText">
                            {invoiceText}
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Aanvraag datum'}
                            value={dateRequested ? moment(dateRequested).format('DD-MM-Y') : ''}
                        />
                        <ViewText
                            label={'Volgende nota datum'}
                            value={dateNextInvoice ? moment(dateNextInvoice).format('DD-MM-Y') : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Totaal bedrag incl. BTW'}
                            value={
                                '€ ' +
                                totalInclVatInclReductionPerYear.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })
                            }
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsFormGeneralView);
