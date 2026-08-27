import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormPersonalView = props => {
    const {
        number,
        createdAt,
        person,
        didAgreeAvg,
        dateDidAgreeAvg,
        portalUser,
        inspectionPersonType,
        hoomAccountId,
    } = props.contactDetails;

    return (
        <div>
            <div className="row">
                <ViewText label={'Contactnummer'} value={number} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label={'Gemaakt op'} value={moment(createdAt).format('DD-MM-Y')} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label="Aanspreektitel" value={person.title && person.title.name} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label="Voorletters" value={person.initials} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label="Voornaam" value={person.firstName} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label="Tussenvoegsel" value={person.lastNamePrefix} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText label="Achternaam" value={person.lastName} className={'col-xs-12'} />
            </div>

            <div className="row">
                <ViewText
                    label={'Geboortedatum'}
                    value={person.dateOfBirth && moment(person.dateOfBirth).format('DD-MM-Y')}
                    className={'col-xs-12'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={'Akkoord privacybeleid'}
                    className={'col-xs-12'}
                    value={
                        didAgreeAvg ? (
                            <span>
                                Ja <em>({dateDidAgreeAvg ? moment(dateDidAgreeAvg).format('L') : ''})</em>
                            </span>
                        ) : (
                            'Nee'
                        )
                    }
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={'Rol in buurtaanpak'}
                    value={inspectionPersonType ? inspectionPersonType.name : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    className={'col-xs-12'}
                    label={'Hoom account id'}
                    value={hoomAccountId ? hoomAccountId : ''}
                />
            </div>

            <div className="row">
                <ViewText label="Portal gebruiker" value={portalUser ? 'Ja' : 'Nee'} className={'col-xs-12'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPersonalView);
