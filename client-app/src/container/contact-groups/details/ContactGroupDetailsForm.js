import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ContactGroupDetailsFormGeneral from './general/ContactGroupDetailsFormGeneral';

class ContactGroupDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van groep.';
        } else if (isEmpty(this.props.contactGroupDetails)) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.contactGroupDetails)) {
            loadingText = 'Geen groep gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ContactGroupDetailsFormGeneral mode={this.props.mode} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactGroupDetails: state.contactGroupDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactGroupDetailsForm);
