import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormOtherPersonView = props => {
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
                    label={"Achternaam partner"}
                    value={lastNamePartner}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Geboortedatum partner"
                    value={dateOfBirthPartner && moment(dateOfBirthPartner).format('DD-MM-Y')}
                />

                <ViewText
                    label="IBAN"
                    value={iban}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aansprakelijkheid"}
                    value={liable ? 'Ja' : 'Nee'}
                />
                <div className="row">
                    <ViewText
                        label="Aansprakelijkheidsbedrag"
                        value={liabilityAmount}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOtherPersonView);