import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

// Functionele wrapper voor de class component
const PaymentInvoiceCreateAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <PaymentInvoiceCreateApp {...props} navigate={navigate} params={params} />;
};

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
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        ProjectRevenueAPI.fetchProjectRevenue(this.props.params.id)
            .then(payload => {
                this.setState({
                    distribution: payload,
                    // isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });

        setTimeout(() => {
            if (this.props.reportPreview) {
                ProjectsAPI.peekDistributionsById(this.props.reportPreview.distributionIds)
                    .then(payload => {
                        this.setState({
                            distributions: payload.data,
                            isLoading: false,
                        });
                    })
                    .catch(error => {
                        this.setState({ isLoading: false });
                    });
            }
        }, 1000);
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
            this.props.reportPreview.distributionIds,
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
            this.props.navigate(this.state.redirect);
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
                                    <PaymentInvoiceCreateList
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
                                    {this.state.isLoading ? (
                                        <div>Gegevens aan het laden.</div>
                                    ) : this.props.reportPreview.templateId ? (
                                        <PaymentInvoiceCreateViewPdf
                                            subject={this.props.reportPreview.subject}
                                            documentTemplateId={this.props.reportPreview.templateId}
                                            emailTemplateId={this.props.reportPreview.emailTemplateId}
                                            distributionId={this.state.distributionId}
                                            isLoading={this.state.isLoading}
                                            amountOfDistributions={
                                                this.state.distributions ? this.state.distributions.length : -1
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
                                        <PaymentInvoiceCreateViewEmail
                                            subject={this.props.reportPreview.subject}
                                            documentTemplateId={this.props.reportPreview.templateId}
                                            emailTemplateId={this.props.reportPreview.emailTemplateId}
                                            distributionId={this.state.distributionId}
                                            isLoading={this.state.isLoading}
                                            amountOfDistributions={
                                                this.state.distributions ? this.state.distributions.length : -1
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
        reportPreview: state.projectRevenueReportPreview,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewReport: () => {
        dispatch(clearPreviewReport());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInvoiceCreateAppWrapper);
