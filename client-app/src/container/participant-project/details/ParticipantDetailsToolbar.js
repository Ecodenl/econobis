import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

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

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
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
        const { participantProject, project = {} } = this.props;
        let numberOfMutations = participantProject.participantMutations
            ? participantProject.participantMutations.length
            : null;
        let disableBeforeEntryDate = this.getDisableBeforeEntryDate(project);
        let allowDeleteAndTerminateButtons = false;
        if (
            numberOfMutations == 0 ||
            validator.isEmpty(disableBeforeEntryDate) ||
            moment().format('YYYY-01-01') >= disableBeforeEntryDate
        ) {
            allowDeleteAndTerminateButtons = true;
        }

        let isTransferable =
            project.isParticipationTransferable &&
            participantProject.participationsCurrent > 0 &&
            participantProject.participationsCurrent &&
            this.props.permissions.manageFinancial;
        isTransferable = participantProject.statusId == 2 ? isTransferable : false;

        const projectTypeCodeRef = project ? project.typeCodeRef : '';

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-3">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                                    {allowDeleteAndTerminateButtons && (
                                        <>
                                            {this.props.permissions.manageParticipation && (
                                                <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                                            )}
                                            {/*todo WM: tijdelijk even ook voor loan en obligation*/}
                                            {/*{projectTypeCodeRef === 'capital' ||*/}
                                            {/*projectTypeCodeRef === 'postalcode_link_capital' ? (*/}
                                            <ButtonText
                                                buttonText={
                                                    participantProject.dateTerminated
                                                        ? `Beëindiging ongedaan maken`
                                                        : `Beëindigen`
                                                }
                                                onClickAction={
                                                    participantProject.dateTerminated
                                                        ? this.toggleUndoTerminate
                                                        : this.toggleTerminate
                                                }
                                                // disabled={participantProject.dateTerminated}
                                            />
                                            {/*todo WM: tijdelijk even ook voor loan en obligation*/}
                                            {/*) : (*/}
                                            {/*    <ButtonText*/}
                                            {/*        buttonText={`Beëindigen`}*/}
                                            {/*        onClickAction={this.toggleTerminate}*/}
                                            {/*        disabled={participantProject.dateTerminated}*/}
                                            {/*    />*/}
                                            {/*)}*/}
                                        </>
                                    )}

                                    {/*{isTransferable ? (*/}
                                    {/*    <ButtonText*/}
                                    {/*        buttonText={`Deelnames overdragen`}*/}
                                    {/*        onClickAction={() =>*/}
                                    {/*            hashHistory.push(*/}
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
                        closeDeleteItemModal={this.toggleDelete}
                        id={participantProject.id}
                        projectid={participantProject.project.id}
                    />
                )}
                {this.state.showTerminate && (
                    <ParticipantDetailsTerminate
                        participantProject={participantProject}
                        setErrorModal={this.setErrorModal}
                        closeDeleteItemModal={this.toggleTerminate}
                        projectTypeCodeRef={participantProject.project.typeCodeRef}
                    />
                )}
                {this.state.showUndoTerminate && (
                    <ParticipantDetailsUndoTerminate
                        participantProject={participantProject}
                        setErrorModal={this.setErrorModal}
                        closeDeleteItemModal={this.toggleUndoTerminate}
                        projectTypeCodeRef={participantProject.project.typeCodeRef}
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

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
        project: state.participantProjectDetails.project,
        permissions: state.meDetails.permissions,
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsToolbar);
