import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import MeasureFormGeneral from './form/MeasureFormGeneral';
import MeasureDetailsFaqs from './FAQs/MeasureDetailsFaqs';
import MeasureDetailsSuppliers from './suppliers/MeasureDetailsSuppliers';
import MeasureDetailsOpportunity from './opportunities/MeasureDetailsOpportunity';
import MeasureDetailsMeasuresTaken from './measuresTaken/MeasureDetailsMeasuresTaken';
import MeasureDetailsMeasuresRequested from "./measuresRequested/MeasureDetailsMeasuresRequested";
import MeasureDetailsConclusionForm from "./conclusion/MeasureDetailsConclusionForm";


class MeasureDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.measure) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <MeasureFormGeneral />
                    <MeasureDetailsFaqs />
                    <MeasureDetailsSuppliers />
                    <MeasureDetailsOpportunity />
                    <MeasureDetailsMeasuresTaken />
                    <MeasureDetailsMeasuresRequested />
                    <MeasureDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        measure: state.measure,
    }
};

export default connect(mapStateToProps)(MeasureDetailsForm);
