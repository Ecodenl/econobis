import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantDetailsToolbar from './ParticipantDetailsToolbar';
import ParticipantDetailsForm from './ParticipantDetailsForm';
import ParticipantDetailsHarmonica from './ParticipantDetailsHarmonica';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';

import {
    fetchParticipantProductionProjectDetails,
    clearParticipantProductionProject,
} from '../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions';

class ParticipantDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchParticipantProductionProjectDetails(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearParticipantProductionProject();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ParticipantDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <ParticipantDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        <ParticipantDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParticipantProductionProjectDetails: id => {
        dispatch(fetchParticipantProductionProjectDetails(id));
    },
    clearParticipantProductionProject: () => {
        dispatch(clearParticipantProductionProject());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantDetailsApp);
