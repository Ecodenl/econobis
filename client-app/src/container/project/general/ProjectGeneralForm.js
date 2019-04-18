import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProjectGeneralFormViewLoan from './summary/ProjectGeneralFormViewLoan';
import ParticipantsListApp from './list-participants/ParticipantsListApp';
import ProjectGeneralFormViewObligation from './summary/ProjectGeneralFormViewObligation';
import ProjectGeneralFormViewCapital from './summary/ProjectGeneralFormViewCapital';
import ProjectGeneralFormViewPostalcodeLinkCapital from './summary/ProjectGeneralFormViewPostalcodeLinkCapital';

class ProjectGeneralForm extends Component {
    renderProjectSummary() {
        switch (this.props.project.projectType.codeRef) {
            case 'loan':
                return <ProjectGeneralFormViewLoan />;
            case 'obligation':
                return <ProjectGeneralFormViewObligation />;
            case 'capital':
                return <ProjectGeneralFormViewCapital />;
            case 'postalcode_link_capital':
                return <ProjectGeneralFormViewPostalcodeLinkCapital />;
            default:
                return <div>Geen type project gevonden.</div>;
        }
    }

    render() {
        return isEmpty(this.props.project) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                {this.renderProjectSummary()}
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
