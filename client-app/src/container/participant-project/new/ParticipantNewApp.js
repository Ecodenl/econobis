import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import ParticipantNewToolbar from './ParticipantNewToolbar';

import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import ProjectsAPI from '../../../api/project/ProjectsAPI';
import { connect } from 'react-redux';
import MultipleMessagesModal from '../../../components/modal/MultipleMessagesModal';
import ParticipantNewForm from './ParticipantNewForm';
import ParticipantSubmitHelper from './ParticipantSubmitHelper';
import ParticipantValidateForm from './ParticipantValidateForm';
import moment from 'moment';

class ParticipantNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalText: [],
            modalRedirectTask: '',
            modalRedirectParticipation: '',
            contacts: [],
            projects: [],
            participationWorth: 0,
            projectTypeCodeRef: '',
            participation: {
                contactId: props.params.contactId || '',
                statusId: '',
                projectId: props.params.projectId || '',
                quantityInterest: 0,
                amountInterest: 0,
                dateInterest: moment().format('YYYY-MM-DD'),
                quantityOption: 0,
                amountOption: 0,
                dateOption: null,
                quantityGranted: 0,
                amountGranted: 0,
                dateGranted: null,
                quantityFinal: 0,
                amountFinal: 0,
                dateContractRetour: null,
                datePayment: null,
                startingDate: null,
            },
            errors: {
                contactId: false,
                statusId: false,
                projectId: false,
                amountOption: false,
                dateOption: false,
                amountGranted: false,
                dateGranted: false,
                amountFinal: false,
                dateContractRetour: false,
                datePayment: false,
                startingDate: false,
            },
        };
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
            });
        });

        ProjectsAPI.peekProjects().then(payload => {
            this.setState({
                projects: payload,
            });

            if (this.props.params.projectId) {
                let project = payload.find(project => project.id == this.props.params.projectId);

                this.setState({
                    ...this.state,
                    projectTypeCodeRef: project.typeCodeRef,
                });
            }
        });
    }

    redirectTask = () => {
        hashHistory.push(this.state.modalRedirectTask);
    };

    redirectParticipation = () => {
        hashHistory.push(this.state.modalRedirectParticipation);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { participation } = this.state;

        let errors = {};
        let hasErrors = false;

        const status = this.props.participantMutationStatuses.find(
            participantMutationStatuses => participantMutationStatuses.id == participation.statusId
        );
        const statusCodeRef = status ? status.codeRef : null;

        const validatedForm = ParticipantValidateForm(participation, errors, hasErrors, statusCodeRef);

        this.setState({ ...this.state, errors: validatedForm.errors });

        if (!validatedForm.hasErrors) {
            const values = ParticipantSubmitHelper(participation, statusCodeRef);

            ParticipantProjectDetailsAPI.storeParticipantProject(values).then(payload => {
                if (payload.data.message !== undefined && payload.data.message.length > 0) {
                    this.setState({
                        showModal: true,
                        modalText: payload.data.message,
                    });
                    this.setState({
                        modalRedirectTask: `/taak/nieuw/contact/${participation.contactId}/project/${
                            participation.projectId
                        }/deelnemer/${payload.data.id}`,
                        modalRedirectParticipation: `/project/deelnemer/${payload.data.id}`,
                    });
                } else {
                    hashHistory.push(`/project/deelnemer/${payload.data.id}`);
                }
            });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ParticipantNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <ParticipantNewForm
                                        editForm={false}
                                        participation={this.state.participation}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleSubmit={this.handleSubmit}
                                        contacts={this.state.contacts}
                                        projects={this.state.projects}
                                        handleProjectChange={this.handleProjectChange}
                                        projectTypeCodeRef={this.state.projectTypeCodeRef}
                                        participantMutationStatuses={this.props.participantMutationStatuses}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
                {this.state.showModal && (
                    <MultipleMessagesModal
                        closeModal={this.redirectParticipation}
                        buttonCancelText={'Ga naar deelname'}
                        confirmAction={this.redirectTask}
                        buttonConfirmText={'Maak taak aan'}
                    >
                        {this.state.modalText}
                    </MultipleMessagesModal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantMutationStatuses: state.systemData.participantMutationStatuses,
    };
};

export default connect(mapStateToProps)(ParticipantNewApp);
