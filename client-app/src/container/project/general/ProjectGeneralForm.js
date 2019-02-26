import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProjectGeneralFormViewOther from './form/ProjectGeneralFormViewOther';
import ProjectGeneralFormViewLoan from './form/ProjectGeneralFormViewLoan';
import ParticipantsListApp from '../../participant-project/list/ParticipantsListApp';

class ProjectGeneralForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isEmpty(this.props.project) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                {this.props.project.projectType.codeRef === 'loan' ? (
                    <ProjectGeneralFormViewLoan />
                ) : (
                    <ProjectGeneralFormViewOther />
                )}
                <ParticipantsListApp />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectGeneralForm);
