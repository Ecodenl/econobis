import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import QuotationRequestDetailsFormGeneral from './general/QuotationRequestDetailsFormGeneral';
import QuotationRequestDetailsFormConclusion from "./conclusion/QuotationRequestDetailsFormConclusion";

class QuotationRequestDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.quotationRequestDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <QuotationRequestDetailsFormGeneral />
                    <QuotationRequestDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

export default connect(mapStateToProps, null)(QuotationRequestDetailsForm);
