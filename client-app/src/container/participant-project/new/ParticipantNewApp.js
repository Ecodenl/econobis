import React, { Component } from 'react';
import validator from 'validator';
import { browserHistory, hashHistory } from 'react-router';

import ParticipantNewToolbar from './ParticipantNewToolbar';
import ParticipantFormDefaultGeneral from '../form-default/ParticipantFormDefaultGeneral';
import { setError } from '../../../actions/general/ErrorActions';

import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import * as ibantools from 'ibantools';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import ProjectsAPI from '../../../api/project/ProjectsAPI';
import { connect } from 'react-redux';
import MultipleMessagesModal from '../../../components/modal/MultipleMessagesModal';
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
                statusId: 1,
                projectId: props.params.projectId || '',
                projectAdministrationName: '',
                dateRegister: '',
                dateContractSend: '',
                dateContractRetour: '',
                datePayed: '',
                didAcceptAgreement: false,
                giftedByContactId: '',
                ibanPayout: '',
                ibanPayoutAttn: '',
                updatedAt: { date: moment() },
                dateEnd: '',
                typeId: '',
                powerKwhConsumption: '',
                participationsRequested: '',
                participationsGranted: '',
                participationsWorth: '',
                participationsWorthTotal: '',
            },
            errors: {
                contactId: false,
                statusId: false,
                projectId: false,
                typeId: false,
                ibanPayout: false,
                powerKwhConsumption: false,
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
                const projectId = this.props.params.projectId;

                let project = payload.find(project => project.id == projectId);

                if (project.typeCodeRef == 'postalcode_link_capital') {
                    this.setState({
                        ...this.state,
                        participation: {
                            ...this.state.participation,
                            typeId: 3, //energieleverancier,
                        },
                        projectTypeCodeRef: project.typeCodeRef,
                    });
                } else {
                    this.setState({
                        ...this.state,
                        participation: {
                            ...this.state.participation,
                            typeId: 1, //op rekening
                        },
                        projectTypeCodeRef: project.typeCodeRef,
                    });
                }

                this.setState({
                    ...this.state,
                    participationWorth: project.participationWorth,
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

    handleProjectChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let selectedProject = this.state.projects.find(project => project.id == value);

        this.setState({
            ...this.state,
            participationWorth: selectedProject.participationWorth,
            projectTypeCodeRef: selectedProject.typeCodeRef,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
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

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.projectId + '')) {
            errors.projectId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProjectDetailsAPI.storeParticipantProject(participation).then(payload => {
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
                                    <ParticipantFormDefaultGeneral
                                        editForm={false}
                                        participation={this.state.participation}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleCancel={browserHistory.goBack}
                                        handleSubmit={this.handleSubmit}
                                        contacts={this.state.contacts}
                                        projects={this.state.projects}
                                        participationWorth={this.state.participationWorth}
                                        handleProjectChange={this.handleProjectChange}
                                        projectTypeCodeRef={this.state.projectTypeCodeRef}
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

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantNewApp);
