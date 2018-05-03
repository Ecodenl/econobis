import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";

const OrderDetailsFormGeneralView = props => {

    const { name, orderNumber, address, postalCode, city, country, kvkNumber, btwNumber, IBAN,
        email, website, bic, sepaContractName, sepaCreditorId, rsinNumber, defaultPaymentTerm, logoName} = props.orderDetails;

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
                            value={orderNumber}
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
                            label={"E-mail"}
                            value={email}
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
                            label={"RSIN nummer"}
                            value={rsinNumber}
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
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsFormGeneralView);