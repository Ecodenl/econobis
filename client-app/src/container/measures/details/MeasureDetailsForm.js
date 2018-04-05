import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import MeasureFormGeneral from './general/MeasureFormGeneral';
import MeasureDetailsFaqs from './FAQs/MeasureDetailsFaqs';
import MeasureDetailsSuppliers from './suppliers/MeasureDetailsSuppliers';
import MeasureDetailsConclusionForm from "./conclusion/MeasureDetailsConclusionForm";


class MeasureDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.measureDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <MeasureFormGeneral />
                    <MeasureDetailsFaqs />
                    <MeasureDetailsSuppliers />
                    <MeasureDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        measureDetails: state.measureDetails,
    }
};

export default connect(mapStateToProps)(MeasureDetailsForm);
