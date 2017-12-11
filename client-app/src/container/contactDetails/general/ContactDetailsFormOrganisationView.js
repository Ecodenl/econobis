import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormOrganisationView = props => {
    const {number, organisation, status, iban, createdAt, memberSince, memberUntil, newsletter} = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Klantnummer"}
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
                    label="Kvk"
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
                    label="Iban"
                    value={ iban }
                />
                <ViewText
                    label="Website"
                    value={ organisation.website}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Industrie"
                    value={ organisation.industry && organisation.industry.name }
                />
                <ViewText
                    label="Soort contact"
                    value={ organisation.type && organisation.type.name }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Nieuwsbrief"
                    value={ (newsletter ? 'Ja' : 'Nee') }
                />
                <ViewText
                    label="Oppervlakte dak"
                    value={ organisation.squareMeters }
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