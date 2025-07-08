import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectGeneralToolbar from './ProjectGeneralToolbar';
import ProjectGeneralForm from './ProjectGeneralForm';
import ProjectDetailsHarmonica from './../details/ProjectDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { fetchProject, clearProject } from '../../../actions/project/ProjectDetailsActions';
import { setParticipantsProjectPagination } from '../../../actions/participants-project/ParticipantsProjectPaginationActions';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const ProjectGeneralAppWrapper = props => {
    const params = useParams();
    return <ProjectGeneralApp {...props} params={params} />;
};

class ProjectGeneralApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProject(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearProject();
    }

    componentDidUpdate(prevProps) {
        this.props.setParticipantsProjectPagination({ page: 0, offset: 0 });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ProjectGeneralToolbar id={this.props.params.id} />
                    </div>

                    <div className="col-md-12">
                        <ProjectGeneralForm filterProjectId={this.props.params.id} />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <ProjectDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProject: id => {
        dispatch(fetchProject(id));
    },
    clearProject: () => {
        dispatch(clearProject());
    },
    setParticipantsProjectPagination: pagination => {
        dispatch(setParticipantsProjectPagination(pagination));
    },
});

export default connect(null, mapDispatchToProps)(ProjectGeneralAppWrapper);
