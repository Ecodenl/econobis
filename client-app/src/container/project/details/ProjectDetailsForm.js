import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProjectFormGeneral from './form/ProjectFormGeneral';
import ProjectDetailsFormConclusion from './conclusion/ProjectDetailsFormConclusion';
import ProjectDetailsFormValueCourse from './value-course/ProjectDetailsFormValueCourse';
import RevenuesListForm from './revenue/list/RevenuesListForm';
import RevenuesKwhListForm from './revenueKwh/list/RevenuesKwhListForm';
import FreeFields from '../../../components/freeFields/FreeFields';

class ProjectDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van project.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.project)) {
            loadingText = 'Geen gegevens gevonden.';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ProjectFormGeneral />

                <FreeFields table={'projects'} recordId={this.props.project.id} initialShowEdit={false} />

                {/* Shows value course only when project type is not equal to loan */}
                {this.props.project.projectType && this.props.project.projectType.codeRef !== 'loan' ? (
                    <ProjectDetailsFormValueCourse />
                ) : null}
                {this.props.project.projectStatus.codeRef !== 'concept' && (
                    <>
                        <RevenuesListForm projectId={this.props.project.id} />
                        {this.props.project.projectType &&
                        this.props.project.projectType.codeRef === 'postalcode_link_capital' ? (
                            <RevenuesKwhListForm projectId={this.props.project.id} />
                        ) : null}
                    </>
                )}
                <ProjectDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ProjectDetailsForm);
