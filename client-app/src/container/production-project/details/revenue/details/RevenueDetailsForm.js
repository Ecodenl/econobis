import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import RevenueFormGeneral from './form/RevenueFormGeneral';
import RevenueDistributionForm from './revenue-distribution/RevenueDistributionForm';
import RevenueConclusion from './conclusion/RevenueConclusion';

class RevenueDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        return (
            isEmpty(this.props.productionProjectRevenue) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <RevenueFormGeneral />
                    <RevenueDistributionForm />
                    <RevenueConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productionProjectRevenue: state.productionProjectRevenue,
    }
};

export default connect(mapStateToProps)(RevenueDetailsForm);
