import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";

const AdministrationDetailsFormGeneralView = props => {

    const { name, administrationNumber, address, postalCode, emailTemplate, emailTemplateReminder, emailTemplateExhortation, city, country, kvkNumber, btwNumber, IBAN, ibanAttn,
        email, website, bic, sepaContractName, sepaCreditorId, rsinNumber, defaultPaymentTerm, logoName} = props.administrationDetails;

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
                            value={administrationNumber}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Adres"}
                            value={address}
                        />
                        <ViewText
                            label={"Postcode"}
                            value={postalCode}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Plaats"}
                            value={city}
                        />
                        <ViewText
                            label={"Land"}
                            value={country ? country.name : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"KvK"}
                            value={kvkNumber}
                        />
                        <ViewText
                            label={"BTW nummer"}
                            value={btwNumber}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"IBAN"}
                            value={IBAN}
                        />
                        <ViewText
                            label={"IBAN t.n.v."}
                            value={ibanAttn}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Website"}
                            value={website}
                        />
                        <ViewText
                            label={"Bic"}
                            value={bic}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={"Sepa contractnaam"}
                            value={sepaContractName}
                        />
                        <ViewText
                            label={"Sepa crediteur id"}
                            value={sepaCreditorId}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template factuur"}
                            value={emailTemplate ? emailTemplate.name : ''}
                        />
                        <ViewText
                            label={"E-mail"}
                            value={email}
                        />

                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template herinnering"}
                            value={emailTemplateReminder ? emailTemplateReminder.name : ''}
                        />
                        <ViewText
                            label={"RSIN nummer"}
                            value={rsinNumber}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"E-mail template aanmaning"}
                            value={emailTemplateExhortation ? emailTemplateExhortation.name : ''}
                        />
                        <ViewText
                            label={"Standaard betalingstermijn(dagen)"}
                            value={defaultPaymentTerm}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Logo"}
                            value={logoName}
                        />
                    </div>
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