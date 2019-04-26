import React, { Component } from 'react';
import validator from 'validator';
import { browserHistory, hashHistory } from 'react-router';

import ParticipantNewToolbar from './ParticipantNewToolbar';
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
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import ParticipantNew from '../details/transfer/ParticipationTransfer';
import ParticipantNewForm from './ParticipantNewForm';

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

    handleSubmit = values => {
        ParticipantProjectDetailsAPI.storeParticipantProject(values)
            .then(payload => {
                console.log(payload);
                // if (payload.data.message !== undefined && payload.data.message.length > 0) {
                //     this.setState({
                //         showModal: true,
                //         modalText: payload.data.message,
                //     });
                //     this.setState({
                //         modalRedirectTask: `/taak/nieuw/contact/${participation.contactId}/project/${
                //             participation.projectId
                //         }/deelnemer/${payload.data.id}`,
                //         modalRedirectParticipation: `/project/deelnemer/${payload.data.id}`,
                //     });
                // } else {
                //     hashHistory.push(`/project/deelnemer/${payload.data.id}`);
                // }
            })
            .catch(error => {
                console.log(error);
                alert('Er is een onbekende fout opgetreden. Probeer het nogmaals.');
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ParticipantNewToolbar />
                    </div>
                    <ParticipantNewForm
                        contacts={this.state.contacts}
                        projects={this.state.projects}
                        contactId={this.props.params.contactId || null}
                        projectId={this.props.params.projectId || null}
                        handleSubmit={this.handleSubmit}
                    />
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
