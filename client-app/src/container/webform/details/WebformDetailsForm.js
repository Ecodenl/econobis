import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchWebformDetails } from '../../../actions/webform/WebformDetailsActions';
import WebformDetailsFormGeneral from './general/WebformDetailsFormGeneral';

class WebformDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van webformulier.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.webformDetails)) {
            loadingText = 'Geen webformulier gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <WebformDetailsFormGeneral />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        webformDetails: state.webformDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchWebformDetails: id => {
        dispatch(fetchWebformDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WebformDetailsForm);
