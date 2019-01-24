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
import fileDownload from 'js-file-download';
import Modal from '../../../../../../components/modal/Modal';

class PaymentInvoiceCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distributions: [],
            distributionId: '',
            successMessage: '',
            redirect: '',
        };
    }

    componentDidMount() {
        ProjectsAPI.peekDistributionsById(this.props.reportPreview.distributionIds).then(payload => {
            let distributionTypeId = payload.data[0].revenue.typeId;
            this.setState({
                distributions: payload.data,
                distributionTypeId: distributionTypeId,
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

    createPaymentInvoices = (createReport, createInvoice) => {
        document.body.style.cursor = 'wait';
        ProjectRevenueAPI.createPaymentInvoices(
            this.props.reportPreview.templateId,
            this.props.reportPreview.emailTemplateId,
            this.props.reportPreview.subject,
            this.props.reportPreview.distributionIds,
            createReport,
            createInvoice
        ).then(payload => {
            document.body.style.cursor = 'default';
            if (createInvoice) {
                if (createReport) {
                    this.setState({
                        successMessage: 'De rapporten worden verzonden en de facturen gemaakt.',
                        redirect: `/financieel/${payload.data}/uitkering-facturen/verzonden`,
                    });
                } else {
                    this.setState({
                        successMessage: 'De facturen worden gemaakt.',
                        redirect: `/financieel/${payload.data}/uitkering-facturen/verzonden`,
                    });
                }
            } else {
                this.setState({
                    successMessage: 'De rapporten worden verzonden.',
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
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <PaymentInvoiceCreateToolbar
                                        createPaymentInvoices={this.createPaymentInvoices}
                                        amountOfDistributions={
                                            this.state.distributions ? this.state.distributions.length : 0
                                        }
                                        administrationId={this.props.params.id}
                                        distributionTypeId={this.state.distributionTypeId}
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
