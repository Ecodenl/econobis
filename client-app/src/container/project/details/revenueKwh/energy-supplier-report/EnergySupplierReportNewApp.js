import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import EnergySupplierReportNewToolbar from './EnergySupplierReportNewToolbar';
import EnergySupplierReportNew from './EnergySupplierReportNew';

import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import DocumentTemplateAPI from '../../../../../api/document-template/DocumentTemplateAPI';
import axios from 'axios';

class EnergySupplierReportNewApp extends Component {
    constructor(props) {
        super(props);

        // const revenueKwh = RevenuesKwhAPI.fetchRevenuesKwh(props.params.revenueId);
        // RevenuesKwhAPI.fetchRevenuesKwh(props.params.revenueId).then(payload => {
        //     this.setState({
        //         document: {
        //             projectName: payload.project.name,
        //             yearBegin: payload.dateBegin,
        //             yearEnd: payload.dateEnd,
        //         },
        //     });
        // });

        this.state = {
            templates: [],
            report: {
                revenueId: props.params.revenueId,
                templateId: '',
                documentName: '',
            },
            errors: {
                templateId: false,
                documentName: false,
            },
        };
    }

    componentDidMount() {
        console.log('test: props revenueId: ' + this.props.params.revenueId);
        console.log('test: state revenueId: ' + this.state.report.revenueId);
        axios
            .all([
                RevenuesKwhAPI.fetchRevenuesKwh(this.props.params.revenueId),
                DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral(),
            ])
            .then(
                axios.spread((payloadRevenuesKwh, payLoadDocumentTemplates) => {
                    let templates = [];

                    payLoadDocumentTemplates.forEach(function(template) {
                        if (template.group == 'revenue') {
                            templates.push({ id: template.id, name: template.name });
                        }
                    });

                    this.setState({
                        templates: templates,
                        report: {
                            documentName: payloadRevenuesKwh.defaultDocumentName,
                        },
                    });
                })
            );

        // RevenuesKwhAPI.fetchRevenuesKwh(props.params.revenueId).then(payload => {
        //     this.setState({
        //         document: {
        //             projectName: payload.project.name,
        //             yearBegin: payload.dateBegin,
        //             yearEnd: payload.dateEnd,
        //         },
        //     });
        // });

        // DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
        //     let templates = [];
        //
        //     payload.forEach(function(template) {
        //         if (template.group == 'revenue') {
        //             templates.push({ id: template.id, name: template.name });
        //         }
        //     });
        //
        //     this.setState({
        //         templates: templates,
        //     });
        // });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            report: {
                ...this.state.report,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { report } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(report.templateId + '')) {
            errors.templateId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(report.documentName + '')) {
            errors.documentName = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            RevenuesKwhAPI.createEnergySupplierReport(report.revenueId, report.templateId, report.documentName).then(
                payload => {
                    hashHistory.push(`/documenten`);
                }
            );
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <EnergySupplierReportNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <EnergySupplierReportNew
                                        report={this.state.report}
                                        // documentData={this.state.document}
                                        errors={this.state.errors}
                                        templates={this.state.templates}
                                        handleInputChange={this.handleInputChange}
                                        handleSubmit={this.handleSubmit}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default EnergySupplierReportNewApp;
