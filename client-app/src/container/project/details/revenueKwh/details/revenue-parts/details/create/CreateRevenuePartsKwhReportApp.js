import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import Panel from '../../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../../components/panel/PanelBody';
import ProjectsAPI from '../../../../../../../../api/project/ProjectsAPI';
import { connect } from 'react-redux';
import { clearPreviewReport } from '../../../../../../../../actions/project/ProjectDetailsActions';
import Modal from '../../../../../../../../components/modal/Modal';
import RevenuePartsKwhAPI from '../../../../../../../../api/project/RevenuePartsKwhAPI';
import CreateRevenuesKwhReportToolbar from '../../../../components-report-preview/CreateRevenuesKwhReportToolbar';
import CreateRevenuesKwhReportList from '../../../../components-report-preview/CreateRevenuesKwhReportList';
import CreateRevenuesKwhReportViewPdf from '../../../../components-report-preview/CreateRevenuesKwhReportViewPdf';
import CreateRevenuesKwhReportViewEmail from '../../../../components-report-preview/CreateRevenuesKwhReportViewEmail';

class CreateRevenuePartsKwhReportApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distributions: [],
            distribution: {},
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
        RevenuePartsKwhAPI.fetchRevenuePartsKwh(this.props.params.id)
            .then(payload => {
                this.setState({
                    distribution: payload,
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });

        ProjectsAPI.peekDistributionsKwhPartsByIds(this.props.reportPreview.distributionIds).then(payload => {
            this.setState({
                distributions: payload.data,
            });
        });
    }

    componentWillUnmount() {
        this.props.clearPreviewReport();
    }

    changeDistribution = distributionId => {
        this.setState({
            distributionId: distributionId,
        });
    };

    createRevenueReport = () => {
        document.body.style.cursor = 'wait';
        this.setState({
            isBusy: true,
        });
        RevenuePartsKwhAPI.createRevenuePartsKwhReport(
            this.props.reportPreview.templateId,
            this.props.reportPreview.emailTemplateId,
            this.props.reportPreview.subject,
            this.props.reportPreview.distributionIds
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
                                    <CreateRevenuesKwhReportToolbar
                                        createRevenueReport={this.createRevenueReport}
                                        amountOfDistributions={
                                            this.state.distributions ? this.state.distributions.length : 0
                                        }
                                        distributionTypeId={
                                            this.state.distribution && this.state.distribution.distributionTypeId
                                        }
                                        distributionCategoryCodeRef={
                                            this.state.distribution &&
                                            this.state.distribution.category &&
                                            this.state.distribution.category.codeRef
                                        }
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
                                    <CreateRevenuesKwhReportList
                                        distributions={this.state.distributions}
                                        isLoading={this.state.isLoading}
                                        changeDistribution={this.changeDistribution}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <CreateRevenuesKwhReportViewPdf
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        distributionId={this.state.distributionId}
                                        isLoading={this.state.isLoading}
                                        amountOfDistributions={
                                            this.state.distributions ? this.state.distributions.length : -1
                                        }
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <CreateRevenuesKwhReportViewEmail
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        distributionId={this.state.distributionId}
                                        isLoading={this.state.isLoading}
                                        amountOfDistributions={
                                            this.state.distributions ? this.state.distributions.length : -1
                                        }
                                    />
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
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reportPreview: state.revenuePartsKwhReportPreview,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewReport: () => {
        dispatch(clearPreviewReport());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRevenuePartsKwhReportApp);
