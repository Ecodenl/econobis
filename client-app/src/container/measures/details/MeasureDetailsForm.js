import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import MeasureFormGeneral from './general/MeasureFormGeneral';
import MeasureDetailsFaqs from './FAQs/MeasureDetailsFaqs';
import MeasureDetailsSuppliers from './suppliers/MeasureDetailsSuppliers';
import MeasureDetailsConclusionForm from './conclusion/MeasureDetailsConclusionForm';

class MeasureDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van maatregel.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.measureDetails)) {
            loadingText = 'Geen maatregel gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <MeasureFormGeneral />
                <MeasureDetailsFaqs />
                <MeasureDetailsSuppliers />
                <MeasureDetailsConclusionForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        measureDetails: state.measureDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(MeasureDetailsForm);
