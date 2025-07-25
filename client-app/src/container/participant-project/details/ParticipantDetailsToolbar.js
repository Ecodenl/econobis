import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ParticipantDetailsDelete from './ParticipantDetailsDelete';
import ButtonText from '../../../components/button/ButtonText';
import ParticipantDetailsTerminate from './ParticipantDetailsTerminate';
import ParticipantDetailsUndoTerminate from './ParticipantDetailsUndoTerminate';
import moment from 'moment';
import validator from 'validator';
import ErrorModal from '../../../components/modal/ErrorModal';
import ParticipantDetailsTerminateLoanOrObligation from './ParticipantDetailsTerminateLoanOrObligation';

// Functionele wrapper voor de class component
const ParticipantDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ParticipantDetailsToolbar {...props} navigate={navigate} />;
};

class ParticipantDetailsToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            showTerminate: false,
            showUndoTerminate: false,
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    showDeleteModal = () => {
        this.setState({ showDelete: true });
    };

    hideDeleteModal = () => {
        this.setState({ showDelete: false });
        this.props.navigate(-1);
    };

    toggleTerminate = () => {
        this.setState({ showTerminate: !this.state.showTerminate });
    };

    toggleUndoTerminate = () => {
        this.setState({ showUndoTerminate: !this.state.showUndoTerminate });
    };

    setErrorModal = errorMessage => {
        this.setState({
            showErrorModal: true,
            modalErrorMessage: errorMessage,
        });
    };
    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    getDisableBeforeEntryDate(project) {
        let lastYearFinancialOverviewDefinitive = 0;
        if (project && project.lastYearFinancialOverviewDefinitive) {
            lastYearFinancialOverviewDefinitive = project.lastYearFinancialOverviewDefinitive;
        } else {
            let administration;
            administration = this.props.administrations.filter(
                administration => administration.id == project.administrationId
            );
            administration = administration[0];
            if (administration && administration.lastYearFinancialOverviewDefinitive) {
                lastYearFinancialOverviewDefinitive = administration.lastYearFinancialOverviewDefinitive;
            }
        }
        let disableBeforeEntryDate =
            lastYearFinancialOverviewDefinitive > 0
                ? moment(moment().year(lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
                : '';
        return disableBeforeEntryDate;
    }

    render() {
        const { participantProject, project, navigate } = this.props;

        if (!participantProject || !project) {
            return;
        } else {
            let numberOfMutations = participantProject.participantMutations
                ? participantProject.participantMutations.length
                : null;
            let disableBeforeEntryDate = this.getDisableBeforeEntryDate(project);
            let allowDeleteAndTerminateButtons = false;
            if (
                this.props.permissions.manageParticipation &&
                (numberOfMutations == 0 ||
                    validator.isEmpty(disableBeforeEntryDate) ||
                    moment().format('YYYY-01-01') >= disableBeforeEntryDate)
            ) {
                allowDeleteAndTerminateButtons = true;
            }

            // let isTransferable =
            //     project.isParticipationTransferable &&
            //     participantProject.participationsCurrent > 0 &&
            //     participantProject.participationsCurrent &&
            //     this.props.permissions.manageParticipation;
            // isTransferable = participantProject.statusId == 2 ? isTransferable : false;

            const projectTypeCodeRef = project ? project.typeCodeRef : '';
            const isTerminated = Boolean(participantProject.dateTerminated);

            return (
                <div className="row">
                    <div className="col-sm-12">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <div className="col-md-3">
                                    <div className="btn-group btn-group-flex margin-small" role="group">
                                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                        {allowDeleteAndTerminateButtons && (
                                            <>
                                                <ButtonIcon iconName={'trash'} onClickAction={this.showDeleteModal} />
                                                {!isTerminated ? (
                                                    <ButtonText
                                                        buttonText={`Beëindigen`}
                                                        onClickAction={this.toggleTerminate}
                                                        disabled={!participantProject.terminatedAllowed}
                                                    />
                                                ) : null}
                                                {isTerminated ? (
                                                    <ButtonText
                                                        buttonText={`Beëindiging ongedaan maken`}
                                                        onClickAction={this.toggleUndoTerminate}
                                                        disabled={!participantProject.undoTerminatedAllowed}
                                                    />
                                                ) : null}
                                            </>
                                        )}

                                        {/*{isTransferable ? (*/}
                                        {/*    <ButtonText*/}
                                        {/*        buttonText={`Deelnames overdragen`}*/}
                                        {/*        onClickAction={() =>*/}
                                        {/*            this.props.navigate(*/}
                                        {/*                `/project/deelnemer/${participantProject.id}/overdragen`*/}
                                        {/*            )*/}
                                        {/*        }*/}
                                        {/*    />*/}
                                        {/*) : (*/}
                                        {/*    <ButtonText buttonText={`Deelnames niet overdraagbaar`} readOnly={true} />*/}
                                        {/*)}*/}
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
                            closeDeleteItemModal={this.hideDeleteModal}
                            id={participantProject.id}
                            projectid={participantProject.project.id}
                        />
                    )}
                    {this.state.showTerminate &&
                        (projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                            <ParticipantDetailsTerminateLoanOrObligation
                                participantProject={participantProject}
                                setErrorModal={this.setErrorModal}
                                closeDeleteItemModal={this.toggleTerminate}
                                projectTypeCodeRef={participantProject.project.typeCodeRef}
                            />
                        ) : (
                            <ParticipantDetailsTerminate
                                participantProject={participantProject}
                                setErrorModal={this.setErrorModal}
                                closeDeleteItemModal={this.toggleTerminate}
                                projectTypeCodeRef={participantProject.project.typeCodeRef}
                            />
                        ))}
                    {this.state.showUndoTerminate && (
                        <ParticipantDetailsUndoTerminate
                            participantProject={participantProject}
                            setErrorModal={this.setErrorModal}
                            closeDeleteItemModal={this.toggleUndoTerminate}
                        />
                    )}
                    {this.state.showErrorModal && (
                        <ErrorModal
                            closeModal={this.closeErrorModal}
                            title={'Fout bij opslaan'}
                            errorMessage={this.state.modalErrorMessage}
                        />
                    )}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
        project: state.participantProjectDetails.project,
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsToolbarWrapper);
