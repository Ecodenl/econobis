import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import TaskDetailsDelete from './TaskDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import TaskDetailsDuplicate from './TaskDetailsDuplicate';

// Functionele wrapper voor de class component
const TaskDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <TaskDetailsToolbar {...props} navigate={navigate} />;
};

class TaskDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            showDuplicate: false,
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
        this.props.navigate('/taken');
    };

    toggleDuplicate = () => {
        this.setState({ showDuplicate: !this.state.showDuplicate });
    };

    render() {
        const { finished } = this.props.taskDetails;
        const { navigate } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-4">
                                <div className="btn-group btn-group-flex" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                    {this.props.permissions.manageTask && (
                                        <ButtonIcon iconName={'copy'} onClickAction={this.toggleDuplicate} />
                                    )}
                                    {this.props.permissions.manageTask && (
                                        <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h3 className="text-center table-title margin-small">
                                    {finished ? 'Notitie' : 'Taak'}{' '}
                                </h3>
                            </div>
                            <div className="col-md-4" />
                        </PanelBody>
                    </Panel>
                </div>
                {this.state.showDelete && (
                    <TaskDetailsDelete
                        closeDeleteItemModal={this.hideDeleteModal}
                        noteSummary={this.props.taskDetails.noteSummary}
                        id={this.props.id}
                    />
                )}
                {this.state.showDuplicate && (
                    <TaskDetailsDuplicate
                        closeModal={this.toggleDuplicate}
                        noteSummary={this.props.taskDetails.noteSummary}
                        id={this.props.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskDetails: state.taskDetails,
        id: state.taskDetails.id,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(TaskDetailsToolbarWrapper);
