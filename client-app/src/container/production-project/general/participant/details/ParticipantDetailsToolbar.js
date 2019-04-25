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
        const { participantProductionProject, productionProject = {} } = this.props;

        let isTransferable =
            productionProject.isParticipationTransferable &&
            participantProductionProject.participationsCurrent > 0 &&
            participantProductionProject.participationsCurrent &&
            this.props.permissions.manageFinancial;
        isTransferable = participantProductionProject.statusId == 2 ? isTransferable : false;

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
                                            buttonText={`Participaties overdragen`}
                                            onClickAction={() =>
                                                hashHistory.push(
                                                    `/productie-project/participant/${
                                                        participantProductionProject.id
                                                    }/overdragen`
                                                )
                                            }
                                        />
                                    ) : (
                                        <ButtonText buttonText={`Participaties niet overdraagbaar`} />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        {participantProductionProject.contact
                                            ? participantProductionProject.contact.fullName
                                            : ''}
                                        /{productionProject ? productionProject.name : ''}
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
                        id={participantProductionProject.id}
                        productionProjectid={participantProductionProject.productionProject.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantProductionProject: state.participantProductionProjectDetails,
        productionProject: state.participantProductionProjectDetails.productionProject,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsToolbar);
