import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectDetailsToolbar from './ProjectDetailsToolbar';
import ProjectDetailsForm from './ProjectDetailsForm';
import ProjectDetailsHarmonica from './ProjectDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { fetchProject, clearProject } from '../../../actions/project/ProjectDetailsActions';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const ProjectDetailsAppWrapper = props => {
    const params = useParams();
    return <ProjectDetailsApp {...props} params={params} />;
};

class ProjectDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProject(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearProject();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ProjectDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <ProjectDetailsForm />
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
});

export default connect(null, mapDispatchToProps)(ProjectDetailsAppWrapper);
