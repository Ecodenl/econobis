import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchMailgunDomainDetails } from '../../../actions/mailgun-domain/MailgunDomainDetailsActions';
import MailgunDomainDetailsFormGeneral from './general/MailgunDomainDetailsFormGeneral';

class MailgunDomainDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van mailgun domein.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.mailgunDomainDetails)) {
            loadingText = 'Geen mailgun domein gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <MailgunDomainDetailsFormGeneral />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailgunDomainDetails: state.mailgunDomainDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailgunDomainDetails: id => {
        dispatch(fetchMailgunDomainDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailgunDomainDetailsForm);
