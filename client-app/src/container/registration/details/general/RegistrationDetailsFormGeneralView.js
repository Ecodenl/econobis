import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const RegistrationDetailsFormGeneralView = props => {
    const { address, buildYear, owner, createdAt, status, sources, campaign, reasons } = props.registrationDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Adres"}
                    value={address && address.street + ' ' + address.number}
                />
                <ViewText
                    label={"Bouwjaar"}
                    value={buildYear}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Woningtype"
                    value={ address.buildingType && address.buildingType.name}
                />

                <ViewText
                    label="Eigendom"
                    value={owner ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmeld datum"}
                    value={ createdAt && moment(createdAt.date).format('L')}
                />
                <ViewText
                    label="Status"
                    value={status && status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmeldingsbron"}
                    value={ sources && sources.map((source) => source.name).join(', ') }
                />
                <ViewText
                    label="Campagne"
                    value={ campaign && campaign.name }
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Wat is belangrijk"}
                    value={ reasons && reasons.map((reason) => reason.name).join(', ') }
                />

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registrationDetails: state.registrationDetails,
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormGeneralView);