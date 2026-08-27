import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormPortalUserView = props => {
    const { email, hasTwoFactorEnabled, failedLogins, blockedUntilFormatted } = props.portalUser;
    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="Inlog emailadres" value={email} />
                <ViewText label="Twee factor authenticatie" value={hasTwoFactorEnabled ? 'Ja' : 'Nee'} />
            </div>
            <div className="row">
                <ViewText label={'Geblokkeerd tot'} value={blockedUntilFormatted} />
                <ViewText label={'Foutieve loginpogingen'} value={failedLogins} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPortalUserView);
