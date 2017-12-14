import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OpportunityFormGeneral from './form/OpportunityFormGeneral';
import OpportunityDetailsConclusionForm from './conclusion/OpportunityDetailsConclusionForm';
import OpportunityDetailsQuotations from './quotations/OpportunityDetailsQuotations';

class OpportunityDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.opportunity) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <OpportunityFormGeneral />
                    <OpportunityDetailsQuotations />
                    <OpportunityDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunity,
    }
};

export default connect(mapStateToProps)(OpportunityDetailsForm);
