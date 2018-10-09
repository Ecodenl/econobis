import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { authLogout } from '../../actions/general/AuthActions';

class Logout extends Component {
    componentWillMount() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('last_activity');

        this.props.authLogout();

        hashHistory.push('/login');
    }

    render() {
        return (
          <div>
            U bent nu uitgelogd.
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authLogout: () => {
        dispatch(authLogout());
    },
});

export default connect(null, mapDispatchToProps)(Logout);
