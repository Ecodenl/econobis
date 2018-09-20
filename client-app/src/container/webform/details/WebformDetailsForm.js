import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchWebformDetails } from '../../../actions/webform/WebformDetailsActions';
import WebformDetailsFormGeneral from './general/WebformDetailsFormGeneral';

const WebformDetailsForm = (props) => (
    isEmpty(props.webformDetails) ?
        <div>Geen gegevens gevonden.</div>
        :
        <div>
            <WebformDetailsFormGeneral />
        </div>
);

const mapStateToProps = (state) => {
    return {
        webformDetails: state.webformDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchWebformDetails: (id) => {
        dispatch(fetchWebformDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WebformDetailsForm);
