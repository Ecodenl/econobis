import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormOrganisationView = props => {
    const {number, organisation, status, iban, ibanAttn, createdAt, memberSince, memberUntil, newsletter, didAgreeAvg} = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Contactnummer"}
                    value={ number }
                />
                <ViewText
                    label={"Gemaakt op"}
                    value={ createdAt && moment(createdAt.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Naam"
                    value={ organisation.name }
                />
                <ViewText
                    label="Status"
                    value={ status && status.name }
                />
            </div>

            <div className="row">
                <ViewText
                    label="KvK"
                    value={ organisation.chamberOfCommerceNumber }
                />
                <ViewText
                    label={"Lid sinds"}
                    value={ memberSince && moment(memberSince.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Btw nummer"
                    value={ organisation.vatNumber }
                />
                <ViewText
                    label={"Opzegdatum"}
                    value={ memberUntil && moment(memberUntil.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    label="IBAN"
                    value={ iban }
                />
                <ViewText
                    label="IBAN t.n.v."
                    value={ ibanAttn }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Website"
                    value={ organisation.website}
                />
                <ViewText
                    label="Industrie"
                    value={ organisation.industry && organisation.industry.name }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Soort contact"
                    value={ organisation.type && organisation.type.name }
                />
                <ViewText
                    label="Oppervlakte dak"
                    value={ organisation.squareMeters }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Nieuwsbrief"
                    value={ (newsletter ? 'Ja' : 'Nee') }
                />
                <ViewText
                    label="Akkoord privacybeleid"
                    value={(didAgreeAvg ? 'Ja' : 'Nee')}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormOrganisationView);