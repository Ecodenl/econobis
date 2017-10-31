import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                hashHistory.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                hashHistory.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }
    return connect(mapStateToProps)(Authentication);
}