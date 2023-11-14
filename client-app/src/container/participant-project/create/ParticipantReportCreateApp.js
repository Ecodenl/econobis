import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ParticipantReportCreateList from './ParticipantReportCreateList';
import ProjectsAPI from '../../../api/project/ProjectsAPI';
import ParticipantReportCreateViewPdf from './ParticipantReportCreateViewPdf';
import ParticipantReportCreateViewEmail from './ParticipantReportCreateViewEmail';
import ParticipantReportCreateToolbar from './ParticipantReportCreateToolbar';
import { connect } from 'react-redux';
import { clearPreviewParticipantReport } from '../../../actions/project/ProjectDetailsActions';
import ParticipantsProjectAPI from '../../../api/participant-project/ParticipantsProjectAPI';
import Modal from '../../../components/modal/Modal';

class ParticipantReportCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            participantId: '',
            successMessage: '',
            errorMessage: '',
            // todo cleanup
            // messages: '',
            redirect: '',
            isBusy: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        ProjectsAPI.peekParticipantsById(this.props.reportPreview.participantIds)
            .then(payload => {
                this.setState({
                    participants: payload.data,
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
    }

    componentWillUnmount() {
        this.props.clearPreviewParticipantReport();
    }

    changeParticipant = participantId => {
        this.setState({
            participantId: participantId,
        });
    };

    createParticipantReports = () => {
        document.body.style.cursor = 'wait';
        this.setState({
            isBusy: true,
        });
        ParticipantsProjectAPI.createParticipantReport(
            this.props.reportPreview.templateId,
            this.props.reportPreview.emailTemplateId,
            this.props.reportPreview.subject,
            this.props.reportPreview.participantIds,
            this.props.reportPreview.showOnPortal
        ).then(payload => {
            document.body.style.cursor = 'default';
            if (!payload.data) {
                this.setState({
                    successMessage: 'De rapporten zijn aangeboden voor verzenden.',
                    isBusy: false,
                });
            } else {
                this.setState({
                    errorMessage: 'Fouten bij verzenden rapporten',
                    // todo cleanup
                    // messages: payload.data,
                    isBusy: false,
                });
            }
        });
    };

    redirect = () => {
        if (this.state.redirect) {
            hashHistory.push(this.state.redirect);
        } else {
            browserHistory.goBack();
        }
    };

    render() {
        let busyText = '';
        let busy = true;

        if (this.state.isBusy) {
            busyText = 'Bezig met versturen rapportage. Dit kan enige tijd duren.';
        } else {
            busy = false;
        }

        return busy ? (
            <div>{busyText}</div>
        ) : (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <ParticipantReportCreateToolbar
                                        createParticipantReports={this.createParticipantReports}
                                        amountOfParticipants={
                                            this.state.participants ? this.state.participants.length : 0
                                        }
                                        administrationId={this.props.params.id}
                                        showOnPortal={this.props.reportPreview.showOnPortal}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-invoice-payments-list'}>
                                    <ParticipantReportCreateList
                                        participants={this.state.participants}
                                        isLoading={this.state.isLoading}
                                        changeParticipant={this.changeParticipant}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    {this.state.isLoading ? (
                                        <div>Gegevens aan het laden.</div>
                                    ) : this.props.reportPreview.templateId ? (
                                        <ParticipantReportCreateViewPdf
                                            subject={this.props.reportPreview.subject}
                                            documentTemplateId={this.props.reportPreview.templateId}
                                            emailTemplateId={this.props.reportPreview.emailTemplateId}
                                            participantId={this.state.participantId}
                                            isLoading={this.state.isLoading}
                                            amountOfParticipants={
                                                this.state.participants ? this.state.participants.length : -1
                                            }
                                        />
                                    ) : (
                                        <div className="text-center text-danger">
                                            Er is geen document template gekozen, er zal alleen een e-mail worden
                                            verstuurd zonder PDF bijlage
                                        </div>
                                    )}
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    {this.state.isLoading ? (
                                        <div>Gegevens aan het laden.</div>
                                    ) : (
                                        <ParticipantReportCreateViewEmail
                                            subject={this.props.reportPreview.subject}
                                            documentTemplateId={this.props.reportPreview.templateId}
                                            emailTemplateId={this.props.reportPreview.emailTemplateId}
                                            participantId={this.state.participantId}
                                            isLoading={this.state.isLoading}
                                            amountOfParticipants={
                                                this.state.participants ? this.state.participants.length : -1
                                            }
                                        />
                                    )}
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
                {this.state.successMessage && (
                    <Modal
                        closeModal={this.redirect}
                        buttonCancelText={'Ok'}
                        showConfirmAction={false}
                        title={'Succes'}
                    >
                        {this.state.successMessage}
                    </Modal>
                )}
                {this.state.errorMessage && (
                    <Modal
                        closeModal={this.redirect}
                        buttonCancelText={'Ok'}
                        showConfirmAction={false}
                        title={'Waarschuwing'}
                    >
                        <h4>{this.state.errorMessage}</h4>
                        {/*todo cleanup*/}
                        {/*<ul>*/}
                        {/*{this.state.messages.map(message => (*/}
                        {/*<li>{message}</li>*/}
                        {/*))}*/}
                        {/*</ul>*/}
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reportPreview: state.projectParticipantReportPreview,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewParticipantReport: () => {
        dispatch(clearPreviewParticipantReport());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantReportCreateApp);
