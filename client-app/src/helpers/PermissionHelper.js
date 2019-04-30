import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function(ComposedComponent, permission) {
    class PermissionHelper extends Component {
        componentWillMount() {
            if (!this.props.permissions[permission]) {
                hashHistory.push('/');
            }
        }

        componentWillUpdate(nextProps) {
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
