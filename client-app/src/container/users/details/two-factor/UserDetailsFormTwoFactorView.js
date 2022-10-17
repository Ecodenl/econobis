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
                {props.requiredByCooperation ? (
                    <ViewText label={'Verplicht'} value="Verplicht vanuit coöperatie" />
                ) : (
                    <ViewText label={'Verplicht'} value={requireTwoFactorAuthentication ? 'Ja' : 'Nee'} />
                )}
                <ViewText label={'Geactiveerd'} value={props.userDetails.hasTwoFactorActivated ? 'Ja' : 'Nee'} />
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
