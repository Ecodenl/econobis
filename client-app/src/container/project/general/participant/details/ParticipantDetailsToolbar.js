import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import ParticipantDetailsDelete from './ParticipantDetailsDelete';
import ButtonText from '../../../../../components/button/ButtonText';

class ParticipantDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        const { participantProject, project = {} } = this.props;

        let isTransferable =
            project.isParticipationTransferable &&
            participantProject.participationsCurrent > 0 &&
            participantProject.participationsCurrent &&
            this.props.permissions.manageFinancial;
        isTransferable = participantProject.statusId == 2 ? isTransferable : false;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-3">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon
                                        iconName={'glyphicon-arrow-left'}
                                        onClickAction={browserHistory.goBack}
                                    />
                                    {this.props.permissions.manageParticipation && (
                                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={this.toggleDelete} />
                                    )}
                                    {isTransferable ? (
                                        <ButtonText
                                            buttonText={`Deelnames overdragen`}
                                            onClickAction={() =>
                                                hashHistory.push(
                                                    `/project/participant/${participantProject.id}/overdragen`
                                                )
                                            }
                                        />
                                    ) : (
                                        <ButtonText buttonText={`Deelnames niet overdraagbaar`} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        {participantProject.contact ? participantProject.contact.fullName : ''}/
                                        {project ? project.name : ''}
                                    </strong>
                                </h4>
                            </div>
                            <div className="col-md-3" />
                        </PanelBody>
                    </Panel>
                </div>

                {this.state.showDelete && (
                    <ParticipantDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        id={participantProject.id}
                        projectid={participantProject.project.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
        project: state.participantProjectDetails.project,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsToolbar);
