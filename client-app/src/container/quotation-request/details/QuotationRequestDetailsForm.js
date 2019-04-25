import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import QuotationRequestDetailsFormGeneral from './general/QuotationRequestDetailsFormGeneral';
import QuotationRequestDetailsFormConclusion from './conclusion/QuotationRequestDetailsFormConclusion';

class QuotationRequestDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van offerteverzoek.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.quotationRequestDetails)) {
            loadingText = 'Geen offerteverzoek gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <QuotationRequestDetailsFormGeneral />
                <QuotationRequestDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(
    mapStateToProps,
    null
)(QuotationRequestDetailsForm);
