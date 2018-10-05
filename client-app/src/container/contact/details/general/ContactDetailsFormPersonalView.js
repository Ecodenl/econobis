import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormPersonalView = props => {
    const { number, createdAt, person, status, newsletter, didAgreeAvg } = props.contactDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Contactnummer"}
                    value={number}
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={moment(createdAt.date).format('DD-MM-Y')}
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Aanspreektitel"
                    value={ person.title && person.title.name}
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Status"
                    value={ status && status.name}
                    className={'col-xs-12 field-to-be-removed'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Voorletters"
                    value={ person.initials }
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Voornaam"
                    value={ person.firstName }
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Tussenvoegsel"
                    value={ person.lastNamePrefix }
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Soort contact"
                    value={person.type && person.type.name}
                    className={'col-xs-12 field-to-be-removed'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Achternaam"
                    value={ person.lastName }
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Geboortedatum"}
                    value={person.dateOfBirth && moment(person.dateOfBirth.date).format('DD-MM-Y')}
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Nieuwsbrief"
                    value={(newsletter ? 'Ja' : 'Nee')}
                    className={'col-xs-12 field-to-be-removed'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Akkoord privacybeleid"
                    value={(didAgreeAvg ? 'Ja' : 'Nee')}
                    className={'col-xs-12'}
                />
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        statuses: state.statuses,
        types: state.types,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        personTypes: state.systemData.personTypes,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPersonalView);