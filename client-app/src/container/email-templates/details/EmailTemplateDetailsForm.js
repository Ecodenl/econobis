import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchEmailTemplate } from '../../../actions/email-templates/EmailTemplateDetailsActions';
import EmailTemplateFormGeneral from './general/EmailTemplateFormGeneral';

class EmailTemplateDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van e-mailtemplate.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.emailTemplate)) {
            loadingText = 'Geen e-mailtemplate gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <EmailTemplateFormGeneral />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailTemplate: state.emailTemplateDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmailTemplate: id => {
        dispatch(fetchEmailTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetailsForm);
