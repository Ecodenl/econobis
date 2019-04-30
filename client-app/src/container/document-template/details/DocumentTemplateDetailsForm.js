import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';
import DocumentTemplateFormGeneral from './general/DocumentTemplateFormGeneral';

class DocumentTemplateDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van documenttemplate.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.documentTemplate)) {
            loadingText = 'Geen documenttemplate gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <DocumentTemplateFormGeneral />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentTemplate: state.documentTemplateDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplate: id => {
        dispatch(fetchDocumentTemplate(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentTemplateDetailsForm);
