import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ProjectDetailsDelete from './ProjectDetailsDelete';

// Functionele wrapper voor de class component
const ProjectDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ProjectDetailsToolbar {...props} navigate={navigate} />;
};

class ProjectDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
        this.props.navigate('/projecten');
    };

    render() {
        const { project, navigate } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-2">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                    {this.props.permissions.manageProject && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h4 className="text-center text-success margin-small">
                                    <strong>Project {project ? project.name : ''}</strong>
                                </h4>
                            </div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>

                {this.state.showDelete && (
                    <ProjectDetailsDelete closeDeleteItemModal={this.hideDeleteModal} id={project.id} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ProjectDetailsToolbarWrapper);
