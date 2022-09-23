import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const UserDetailsFormTwoFactorView = props => {
    const {
        requireTwoFactorAuthentication,
    } = props.userDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label={'Verplicht'} value={requireTwoFactorAuthentication ? 'Ja' : 'Nee'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormTwoFactorView);
