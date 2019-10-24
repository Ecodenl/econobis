import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormPortalUserView = props => {
    const { email } = props.portalUser;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="Inlog emailadres" value={email} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPortalUserView);
