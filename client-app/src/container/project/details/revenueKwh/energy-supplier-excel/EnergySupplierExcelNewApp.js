import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import EnergySupplierExcelNewToolbar from './EnergySupplierExcelNewToolbar';
import EnergySupplierExcelNew from './EnergySupplierExcelNew';

import RevenuesKwhAPI from '../../../../../api/project/RevenuesKwhAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';

class EnergySupplierExcelNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            excel: {
                revenueId: props.params.revenueId,
                energySupplierId: 0,
                documentName: '',
            },
            errors: {
                energySupplierId: false,
                documentName: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            excel: {
                ...this.state.excel,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { excel } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(excel.energySupplierId + '')) {
            errors.energySupplierId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(excel.documentName + '')) {
            errors.documentName = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            RevenuesKwhAPI.createEnergySupplierExcel(excel.revenueId, excel.energySupplierId, excel.documentName).then(
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
                        <EnergySupplierExcelNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <EnergySupplierExcelNew
                                        excel={this.state.excel}
                                        errors={this.state.errors}
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

export default EnergySupplierExcelNewApp;
