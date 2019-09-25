import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

// import { fetchPortalSettings } from '../../../actions/portal-settings/fetchPortalSettingsActions';

class PortalSettingsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van portal instellingen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.portalSettings)) {
            loadingText = 'Geen portal instellingen gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <h1>form</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        portalSettings: state.portalSettings,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPortalSettings: () => {
        dispatch(fetchPortalSettings);
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortalSettingsForm);
