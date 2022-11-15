import React from 'react';
import {connect} from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const UserDetailsFormTwoFactorView = props => {
    const {
        requireTwoFactorAuthentication,
    } = props.userDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                {props.requiredByCooperation ? (
                    <ViewText label={'Verplicht voor deze gebruiker'} value="Verplicht vanuit coöperatie"/>
                ) : (
                    <ViewText label={'Verplicht voor deze gebruiker'}
                              value={requireTwoFactorAuthentication ? 'Ja' : 'Nee'}
                              textToolTip="Je kan 2 factor authenticatie voor alle gebruikers verplichten via instellingen > coöperatie"
                              size={'col-sm-5'}
                    />
                )}
                <ViewText label={'Geactiveerd'} value={props.userDetails.hasTwoFactorActivated ? 'Ja' : 'Nee'}/>
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
