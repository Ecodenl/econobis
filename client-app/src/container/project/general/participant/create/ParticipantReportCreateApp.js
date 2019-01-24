import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ParticipantReportCreateList from './ParticipantReportCreateList';
import ProjectsAPI from '../../../../../api/project/ProjectsAPI';
import ParticipantReportCreateViewPdf from './ParticipantReportCreateViewPdf';
import ParticipantReportCreateViewEmail from './ParticipantReportCreateViewEmail';
import ParticipantReportCreateToolbar from './ParticipantReportCreateToolbar';
import { connect } from 'react-redux';
import { clearPreviewParticipantReport } from '../../../../../actions/project/ProjectDetailsActions';
import ParticipantsProjectAPI from '../../../../../api/participant-project/ParticipantsProjectAPI';

class ParticipantReportCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            participantId: '',
        };
    }

    componentDidMount() {
        ProjectsAPI.peekParticipantsById(this.props.reportPreview.participantIds).then(payload => {
            this.setState({
                participants: payload.data,
            });
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
        ParticipantsProjectAPI.createParticipantReport(
            this.props.reportPreview.templateId,
            this.props.reportPreview.emailTemplateId,
            this.props.reportPreview.subject,
            this.props.reportPreview.participantIds
        ).then(payload => {
            browserHistory.goBack();
        });
    };

    render() {
        return (
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
                                    <ParticipantReportCreateViewPdf
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        participantId={this.state.participantId}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <ParticipantReportCreateViewEmail
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        participantId={this.state.participantId}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantReportCreateApp);
