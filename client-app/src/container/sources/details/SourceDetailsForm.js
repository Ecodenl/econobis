import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import SourceDetailsFormGeneral from './general/SourceDetailsFormGeneral';
import * as PropTypes from 'prop-types';

class SourceDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { source, hasError, isLoading, updateState } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van aanmeldingsbron.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(source)) {
            loadingText = 'Geen aanmeldingsbron gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <SourceDetailsFormGeneral source={source} updateState={updateState} />
            </div>
        );
    }
}

SourceDetailsForm.propTypes = {
    source: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any,
};

export default SourceDetailsForm;
