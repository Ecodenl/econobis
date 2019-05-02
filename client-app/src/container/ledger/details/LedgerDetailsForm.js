import React, {Component} from 'react';
import { isEmpty } from 'lodash';

import LedgerDetailsFormGeneral from './general/LedgerDetailsFormGeneral';
import * as PropTypes from "prop-types";

class LedgerDetailsForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {ledger, hasError, isLoading, updateState} = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van grootboek.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(ledger)) {
            loadingText = 'Geen grootboek gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <LedgerDetailsFormGeneral ledger={ledger} updateState={updateState}/>
            </div>
        );
    }
}

LedgerDetailsForm.propTypes = {
    ledger: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
    updateState: PropTypes.any
}

export default LedgerDetailsForm;
