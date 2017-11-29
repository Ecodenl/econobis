import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const RegistrationDetailsFormGeneralView = props => {
    const { address, buildYear, buildingTypeId, owner, status, sources, campaignId, registrationReasonIds } = props.registrationDetails;

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
                    value={buildingTypeId}
                />

                <ViewText
                    label="Eigendom"
                    value={owner ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmeld datum"}
                    value={''}
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
                <div className="row">
                    <ViewText
                        label="Campagne"
                        value={''}
                    />
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={"Wat is belangrijk"}
                    value={''}
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