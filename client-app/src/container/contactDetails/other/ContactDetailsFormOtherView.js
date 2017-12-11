import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormOtherView = props => {
    const { firstNamePartner, lastNamePartner, dateOfBirthPartner } = props.contactDetails.person;
    const { iban, liable, liabilityAmount } = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Voornaam partner"}
                    value={firstNamePartner}
                />
                <ViewText
                    label="IBAN"
                    value={iban}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Achternaam partner"}
                    value={lastNamePartner}
                />
                <ViewText
                    label={"Aansprakelijkheid"}
                    value={liable ? 'Ja' : 'Nee'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Geboortedatum partner"
                    value={dateOfBirthPartner && moment(dateOfBirthPartner).format('DD-MM-Y')}
                />
                <ViewText
                    label="Aansprakelijkheidsbedrag"
                    value={'€ ' + liabilityAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
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

export default connect(mapStateToProps)(ContactDetailsFormOtherView);