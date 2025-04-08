import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function(ComposedComponent, permission) {
    class PermissionHelper extends Component {
        UNSAFE_componentWillMount() {
            if (!this.props.permissions[permission]) {
                hashHistory.push('/');
            }
        }

        UNSAFE_componentWillUpdate(nextProps) {
            if (!nextProps.permissions[permission]) {
                hashHistory.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { permissions: state.meDetails.permissions };
    }

    return connect(mapStateToProps)(PermissionHelper);
}
