import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import HousingFileDetailsFormGeneral from './general/HousingFileDetailsFormGeneral';
import HousingFileSpecifications from './housing-file-specifications/HousingFileSpecifications';
import HousingFileDetailsFormConclusion from './conclusion/HousingFileDetailsFormConclusion';

class HousingFileDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van woningdossier.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.housingFileDetails)) {
            loadingText = 'Geen woningdossier gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <HousingFileDetailsFormGeneral />
                <HousingFileSpecifications />
                <HousingFileDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(HousingFileDetailsForm);
