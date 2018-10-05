import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormOrganisationView = props => {
    const {number, organisation, status, iban, ibanAttn, createdAt, newsletter, didAgreeAvg} = props.contactDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={"Contactnummer"}
                    value={ number }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={"Gemaakt op"}
                    value={ createdAt && moment(createdAt.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="Naam"
                    value={ organisation.name }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12 field-to-be-removed'}
                    label="Status"
                    value={ status && status.name }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="KvK"
                    value={ organisation.chamberOfCommerceNumber }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="Btw nummer"
                    value={ organisation.vatNumber }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="IBAN"
                    value={ iban }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="IBAN t.n.v."
                    value={ ibanAttn }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label="Website"
                    value={ organisation.website}
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12 field-to-be-removed'}
                    label="Industrie"
                    value={ organisation.industry && organisation.industry.name }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12 field-to-be-removed'}
                    label="Soort contact"
                    value={ organisation.type && organisation.type.name }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12 field-to-be-removed'}
                    label="Oppervlakte dak"
                    value={ organisation.squareMeters }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12 field-to-be-removed'}
                    label="Nieuwsbrief"
                    value={ (newsletter ? 'Ja' : 'Nee') }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
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