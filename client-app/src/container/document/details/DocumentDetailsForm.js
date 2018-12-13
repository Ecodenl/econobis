import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import DocumentFormGeneral from './general/DocumentFormGeneral';
import DocumentDetailsFormConclusion from "./conclusion/DocumentDetailsFormConclusion";

class DocumentDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van document.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.documentDetails)) {
            loadingText = 'Geen document gevonden!';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
                :
                <div>
                    <DocumentFormGeneral />
                    <DocumentDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(DocumentDetailsForm);
