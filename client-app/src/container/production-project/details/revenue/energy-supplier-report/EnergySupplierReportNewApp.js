import React, { Component } from 'react';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import EnergySupplierReportNewToolbar from './EnergySupplierReportNewToolbar';
import EnergySupplierReportNew from './EnergySupplierReportNew';

import ProductionProjectRevenueAPI from '../../../../../api/production-project/ProductionProjectRevenueAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import DocumentTemplateAPI from '../../../../../api/document-template/DocumentTemplateAPI';

class EnergySupplierReportNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [],
            report: {
                revenueId: props.params.revenueId,
                templateId: '',
                energySupplierId: '',
                documentName: '',
            },
            errors: {
                templateId: false,
                energySupplierId: false,
                documentName: false,
            },
        };
    }

    componentDidMount() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let templates = [];

            payload.forEach(function(template) {
                if (template.group == 'revenue') {
                    templates.push({ id: template.id, name: template.name });
                }
            });

            this.setState({
                templates: templates,
            });
        });
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

        if (validator.isEmpty(report.energySupplierId + '')) {
            errors.energySupplierId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(report.documentName + '')) {
            errors.documentName = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ProductionProjectRevenueAPI.createEnergySupplierReport(
                report.revenueId,
                report.templateId,
                report.energySupplierId,
                report.documentName
            ).then(payload => {
                hashHistory.push(`/documenten`);
            });
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
