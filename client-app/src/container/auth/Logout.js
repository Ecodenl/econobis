import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { authLogout } from '../../actions/general/AuthActions';

// Functionele wrapper voor de class component
const LogoutWrapper = props => {
    const navigate = useNavigate();
    const location = useLocation(); // Gebruik useLocation om toegang te krijgen tot query parameters

    return <Logout {...props} navigate={navigate} location={location} />;
};

class Logout extends Component {
    componentDidMount() {
        // Verwijder de tokens uit localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('last_activity');

        // Verkrijg de 'force' query parameter uit de URL
        const searchParams = new URLSearchParams(this.props.location.search);
        const force = searchParams.get('force');

        // Verwijder two_factor_token als 'force' gelijk is aan '1'
        if (force === '1') {
            localStorage.removeItem('two_factor_token');
        }

        // Voer de logout actie uit
        this.props.authLogout();

        // Redirect naar login pagina na uitloggen
        // this.props.navigate('/login');
        // Gebruik een korte delay om redirect soepel te laten verlopen
        setTimeout(() => {
            this.props.navigate('/login');
        }, 0);
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

export default connect(null, mapDispatchToProps)(LogoutWrapper);
