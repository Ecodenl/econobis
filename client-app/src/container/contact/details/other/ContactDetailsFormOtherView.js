import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormOtherView = props => {
    const { firstNamePartner, lastNamePartner, dateOfBirthPartner } = props.contactDetails.person;
    const { iban, ibanAttn, liable, liabilityAmount } = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="IBAN" value={iban} />
                <ViewText label={'Voornaam partner'} value={firstNamePartner} />
            </div>

            <div className="row">
                <ViewText label="IBAN t.n.v." value={ibanAttn} />
                <ViewText label={'Achternaam partner'} value={lastNamePartner} />
            </div>

            <div className="row">
                <ViewText
                    label="Geboortedatum partner"
                    value={dateOfBirthPartner && moment(dateOfBirthPartner).format('DD-MM-Y')}
                    className={'col-sm-push-6 col-sm-6'}
                />
            </div>

            <div className="row">
                <ViewText label={'Aansprakelijkheid'} value={liable ? 'Ja' : 'Nee'} />
                <ViewText
                    label="Aansprakelijkheidsbedrag"
                    value={'€ ' + liabilityAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOtherView);
