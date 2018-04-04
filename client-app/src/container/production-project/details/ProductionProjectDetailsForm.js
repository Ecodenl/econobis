import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProductionProjectFormGeneral from './form/ProductionProjectFormGeneral';
import ProductionProjectDetailsFormConclusion from './conclusion/ProductionProjectDetailsFormConclusion';
import ProductionProjectDetailsFormValueCourse from './value-course/ProductionProjectDetailsFormValueCourse';
import RevenuesListForm from './revenue/list/RevenuesListForm';

class ProductionProjectDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        return (
            isEmpty(this.props.productionProject) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <ProductionProjectFormGeneral />
                    <ProductionProjectDetailsFormValueCourse />
                    <RevenuesListForm productionProjectId={this.props.productionProject.id}/>
                    <ProductionProjectDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productionProject: state.productionProjectDetails,
    }
};

export default connect(mapStateToProps)(ProductionProjectDetailsForm);
