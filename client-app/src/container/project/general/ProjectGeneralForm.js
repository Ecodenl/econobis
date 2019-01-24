import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ProjectGeneralFormGeneral from './form/ProjectGeneralFormGeneral';
import ParticipantsListApp from './participant/list/ParticipantsListApp';

class ProjectGeneralForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isEmpty(this.props.project) ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <ProjectGeneralFormGeneral />
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
