import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PaymentInvoiceCreateList from "./PaymentInvoiceCreateList";
import ProductionProjectsAPI from "../../../../../../api/production-project/ProductionProjectsAPI";
import PaymentInvoiceCreateViewPdf from "./PaymentInvoiceCreateViewPdf";
import PaymentInvoiceCreateViewEmail from "./PaymentInvoiceCreateViewEmail";
import PaymentInvoiceCreateToolbar from "./PaymentInvoiceCreateToolbar";
import {connect} from "react-redux";
import {clearPreviewReport} from "../../../../../../actions/production-project/ProductionProjectDetailsActions";
import ProductionProjectRevenueAPI from "../../../../../../api/production-project/ProductionProjectRevenueAPI";
import fileDownload from "js-file-download";

class PaymentInvoiceCreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distributions: [],
            distributionId: '',
        };
    };

    componentDidMount() {
        ProductionProjectsAPI.peekDistributionsById(this.props.reportPreview.distributionIds).then((payload) => {
            this.setState({
                distributions: payload.data,
            });
        });
    };

    componentWillUnmount(){
        this.props.clearPreviewReport();
    }

    changeDistribution = (distributionId) => {
        this.setState({
            distributionId: distributionId
        });
    };

    createPaymentInvoices = () => {
        ProductionProjectRevenueAPI.createPaymentInvoices(this.props.reportPreview.templateId, this.props.reportPreview.emailTemplateId, this.props.reportPreview.subject, this.props.reportPreview.distributionIds).then((payload) => {
            fileDownload(payload.data, payload.headers['x-filename']);
            hashHistory.push(`/financieel/${payload.headers.administrationid}/uitkering-facturen/verzonden`);
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={"panel-small"}>
                                    <PaymentInvoiceCreateToolbar createPaymentInvoices={this.createPaymentInvoices} amountOfDistributions={this.state.distributions ? this.state.distributions.length : 0} administrationId={this.props.params.id}/>
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
                                <PaymentInvoiceCreateList distributions={this.state.distributions} changeDistribution={this.changeDistribution}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <PaymentInvoiceCreateViewPdf subject={this.props.reportPreview.subject} documentTemplateId={this.props.reportPreview.templateId} emailTemplateId={this.props.reportPreview.emailTemplateId} distributionId={this.state.distributionId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <PaymentInvoiceCreateViewEmail subject={this.props.reportPreview.subject} documentTemplateId={this.props.reportPreview.templateId} emailTemplateId={this.props.reportPreview.emailTemplateId} distributionId={this.state.distributionId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
            </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        reportPreview: state.productionProjectRevenueReportPreview,
    }
};

const mapDispatchToProps = dispatch => ({
    clearPreviewReport: () => {
        dispatch(clearPreviewReport());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInvoiceCreateApp);
