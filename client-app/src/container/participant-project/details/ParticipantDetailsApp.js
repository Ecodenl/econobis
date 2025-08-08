import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantDetailsToolbar from './ParticipantDetailsToolbar';
import ParticipantDetailsForm from './ParticipantDetailsForm';
import ParticipantDetailsHarmonica from './ParticipantDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import {
    fetchParticipantProjectDetails,
    clearParticipantProject,
} from '../../../actions/participants-project/ParticipantProjectDetailsActions';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const ParticipantDetailsAppWrapper = props => {
    const params = useParams();
    return <ParticipantDetailsApp {...props} params={params} />;
};

class ParticipantDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchParticipantProjectDetails(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearParticipantProject();
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
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <ParticipantDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
    clearParticipantProject: () => {
        dispatch(clearParticipantProject());
    },
});

export default connect(null, mapDispatchToProps)(ParticipantDetailsAppWrapper);
