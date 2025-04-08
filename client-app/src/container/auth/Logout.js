import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { authLogout } from '../../actions/general/AuthActions';

class Logout extends Component {
    UNSAFE_componentWillMount() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('last_activity');

        /**
         * De "force" parameter wordt meegegeven bij handmatig uitloggen door gebruiker.
         * Op dat moment willen we ook dat bij volgende keer inloggen de twee factor code opnieuw moet worden ingevoerd.
         * Als gebruiker wordt uitgelogd doordat de sessie is verlopen komt de code hier ook langs maar willen we niet dat de two factor code opnieuw moet worden ingevoerd bij volgende login.
         */
        if(this.props.location.query.force === '1'){
            localStorage.removeItem('two_factor_token');
        }

        this.props.authLogout();

        hashHistory.push('/login');
    }

    render() {
        return <div>U bent nu uitgelogd.</div>;
    }
}

const mapDispatchToProps = dispatch => ({
    authLogout: () => {
        dispatch(authLogout());
    },
});

export default connect(null, mapDispatchToProps)(Logout);
