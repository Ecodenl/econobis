import React, { Component } from 'react';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import EnergySupplierCSVNewToolbar from './EnergySupplierCSVNewToolbar';
import EnergySupplierCSVNew from './EnergySupplierCSVNew';

import ProductionProjectRevenueAPI from '../../../../../api/production-project/ProductionProjectRevenueAPI';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import DocumentTemplateAPI from "../../../../../api/document-template/DocumentTemplateAPI";

class EnergySupplierCSVNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [],
            csv: {
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
    };

    componentDidMount() {
        let templates = [];

        templates.push({id: 1, name: 'Eneco'});
        templates.push({id: 2, name: 'Greenchoice'});
        templates.push({id: 3, name: 'Oxxio'});
        templates.push({id: 4, name: 'Nuon'});

        this.setState({
            templates: templates,
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            csv: {
                ...this.state.csv,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {csv} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(csv.templateId + '')){
            errors.templateId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(csv.energySupplierId + '')){
            errors.energySupplierId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(csv.documentName + '')){
            errors.documentName = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        ProductionProjectRevenueAPI.createEnergySupplierCsv(csv.revenueId, csv.templateId, csv.energySupplierId, csv.documentName).then(payload => {
            hashHistory.push(`/documenten`);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <EnergySupplierCSVNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <EnergySupplierCSVNew
                                        csv={this.state.csv}
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
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default EnergySupplierCSVNewApp;