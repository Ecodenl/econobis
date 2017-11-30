import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function(ComposedComponent, permission) {
    class PermissionHelper extends Component {
        componentWillMount() {
            if (!permission) {
                hashHistory.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!permission) {
                hashHistory.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { meDetails: state.meDetails };
    }

    return connect(mapStateToProps)(PermissionHelper);
}