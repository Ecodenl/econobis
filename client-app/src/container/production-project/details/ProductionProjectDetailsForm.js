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
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van productie project.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.productionProject)) {
            loadingText = 'Geen gegevens gevonden.';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
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
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(ProductionProjectDetailsForm);
