import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormPersonalView = props => {
    const {number, createdAt, person, status, memberSince, memberUntil, newsletter} = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Klantnummer"}
                    value={number}
                />
                <ViewText
                    label={"Gemaakt op"}
                    value={moment(createdAt.date).format('DD-MM-Y')}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Aanspreektitel"
                    value={ person.title && person.title.name}
                />

                <ViewText
                    label="Status"
                    value={status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Voornaam"
                    value={ person.firstName }
                />

                <ViewText
                    label={"Lid sinds"}
                    value={ memberSince && moment(memberSince.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Tussenvoegsel"
                    value={ person.lastNamePrefix && person.lastNamePrefix.name }
                />
                <ViewText
                    label={"Opzegdatum"}s
                    value={ memberUntil && moment(memberUntil.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Achternaam"
                    value={ person.lastName }
                />
                <ViewText
                    label="Soort contact"
                    value={ person.type && person.type.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Organisatie"
                    value={ person.account && person.account.name }
                />
                <ViewText
                    label={"Geboortedatum"}
                    value={ person.dateOfBirth && moment(person.dateOfBirth.date).format('DD-MM-Y') }
                />
            </div>
            <div className="row">
                <ViewText
                    label="Nieuwsbrief"
                    value={ (newsletter ? 'Ja' : 'Nee') }
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