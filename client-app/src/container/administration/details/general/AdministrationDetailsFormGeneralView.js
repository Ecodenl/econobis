import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";

const AdministrationDetailsFormGeneralView = props => {

    const { name, administrationNumber, address, postalCode, emailTemplateCollection, emailTemplateTransfer, emailTemplateReminder, emailTemplateExhortation, city, country, kvkNumber, btwNumber, IBAN, ibanAttn,
        email, website, bic, sepaContractName, sepaCreditorId, rsinNumber, defaultPaymentTerm, logoName, usesTwinfield, twinfieldUsername, twinfieldOrganizationCode,
        twinfieldOfficeCode, defaultInvoiceTemplate, btwCodeSalesNull, btwCodeSales0, btwCodeSales6, btwCodeSales21} = props.administrationDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Naam"}
                            value={name}
                        />
                        <ViewText
                            label={"Administratie nummer"}
                            value={administrationNumber ? administrationNumber : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Adres"}
                            value={address ? address : ''}
                        />
                        <ViewText
                            label={"Postcode"}
                            value={postalCode ? postalCode : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Plaats"}
                            value={city ? city : ''}
                        />
                        <ViewText
                            label={"Land"}
                            value={country ? country.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"KvK"}
                            value={kvkNumber ? kvkNumber : ''}
                        />
                        <ViewText
                            label={"BTW nummer"}
                            value={btwNumber ? btwNumber : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"IBAN"}
                            value={IBAN ? IBAN : ''}
                        />
                        <ViewText
                            label={"IBAN t.n.v."}
                            value={ibanAttn ? ibanAttn : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Website"}
                            value={website ? website : ''}
                        />
                        <ViewText
                            label={"Bic"}
                            value={bic ? bic : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Sepa contractnaam"}
                            value={sepaContractName ? sepaContractName : ''}
                        />
                        <ViewText
                            label={"Sepa crediteur id"}
                            value={sepaCreditorId ? sepaCreditorId : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template factuur incasso"}
                            value={emailTemplateCollection ? emailTemplateCollection.name : ''}
                        />
                        <ViewText
                            label={"E-mail"}
                            value={email ? email : ''}
                        />

                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template factuur overboeken"}
                            value={emailTemplateTransfer ? emailTemplateTransfer.name : ''}
                        />
                        <ViewText
                            label={"RSIN nummer"}
                            value={rsinNumber ? rsinNumber : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template herinnering"}
                            value={emailTemplateReminder ? emailTemplateReminder.name : ''}
                        />
                        <ViewText
                            label={"Standaard betalingstermijn(dagen)"}
                            value={defaultPaymentTerm ? defaultPaymentTerm : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template aanmaning"}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={"Logo"}
                            value={logoName}
                        />
                    </div>

                    {usesTwinfield == true &&
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Twinfield</span>
                        </div>
                    </div>
                    }

                    <div className="row">
                        <ViewText
                            label={"Gebruikt Twinfield"}
                            value={usesTwinfield ? 'Ja' : 'Nee'}
                        />
                    </div>

                    {usesTwinfield == true &&
                    <div className="row">
                        <ViewText
                            label={"Gebruikersnaam"}
                            value={twinfieldUsername}
                        />
                        <ViewText
                            label={"Wachtwoord"}
                            value='••••••••••'
                        />
                    </div>
                    }

                    {usesTwinfield == true &&
                    <div className="row">
                        <ViewText
                            label={"Omgeving"}
                            value={twinfieldOrganizationCode}
                        />
                        <ViewText
                            label={"Code"}
                            value={twinfieldOfficeCode}
                        />
                    </div>
                    }

                    {usesTwinfield == true &&
                    <div className="row">
                        <ViewText
                            label={"Standaard factuurtemplate"}
                            value={defaultInvoiceTemplate}
                        />
                    </div>
                    }

                    {usesTwinfield == true &&
                    <div className="row">
                        <ViewText
                            label={"BTW code verkoop geen"}
                            value={btwCodeSalesNull}
                        />
                        <ViewText
                            label={"BTW code verkoop 0%"}
                            value={btwCodeSales0}
                        />
                    </div>
                    }

                    {usesTwinfield == true &&
                    <div className="row">
                        <ViewText
                            label={"BTW code verkoop 6%"}
                            value={btwCodeSales6}
                        />
                        <ViewText
                            label={"BTW code verkoop 21%"}
                            value={btwCodeSales21}
                        />
                    </div>
                    }
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsFormGeneralView);