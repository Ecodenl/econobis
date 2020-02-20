import React, { Component } from 'react';
import { browserHistory, hashHistory } from 'react-router';

import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PaymentInvoiceCreateList from './PaymentInvoiceCreateList';
import ProjectsAPI from '../../../../../../api/project/ProjectsAPI';
import PaymentInvoiceCreateViewPdf from './PaymentInvoiceCreateViewPdf';
import PaymentInvoiceCreateViewEmail from './PaymentInvoiceCreateViewEmail';
import PaymentInvoiceCreateToolbar from './PaymentInvoiceCreateToolbar';
import { connect } from 'react-redux';
import { clearPreviewReport } from '../../../../../../actions/project/ProjectDetailsActions';
import ProjectRevenueAPI from '../../../../../../api/project/ProjectRevenueAPI';
import Modal from '../../../../../../components/modal/Modal';

class PaymentInvoiceCreateApp extends Component {
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
        };
    }

    componentDidMount() {
        ProjectRevenueAPI.fetchProjectRevenue(this.props.params.id).then(payload => {
            this.setState({
                distribution: payload,
            });
        });

        ProjectsAPI.peekDistributionsById(this.props.reportPreview.distributionIds).then(payload => {
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
        ProjectRevenueAPI.createRevenueReport(
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
                                    <PaymentInvoiceCreateToolbar
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
                                    <PaymentInvoiceCreateList
                                        distributions={this.state.distributions}
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
                                    <PaymentInvoiceCreateViewPdf
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        distributionId={this.state.distributionId}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <PaymentInvoiceCreateViewEmail
                                        subject={this.props.reportPreview.subject}
                                        documentTemplateId={this.props.reportPreview.templateId}
                                        emailTemplateId={this.props.reportPreview.emailTemplateId}
                                        distributionId={this.state.distributionId}
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
        reportPreview: state.projectRevenueReportPreview,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewReport: () => {
        dispatch(clearPreviewReport());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentInvoiceCreateApp);
