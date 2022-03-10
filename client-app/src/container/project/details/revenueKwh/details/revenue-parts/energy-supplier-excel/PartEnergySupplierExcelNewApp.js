import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import PartEnergySupplierExcelNewToolbar from './PartEnergySupplierExcelNewToolbar';
import PartEnergySupplierExcelNew from './PartEnergySupplierExcelNew';

import Panel from '../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../components/panel/PanelBody';
import { connect } from 'react-redux';
import { clearEnergySupplierExcelReportKwh } from '../../../../../../../actions/project/ProjectDetailsActions';
import ProjectsAPI from '../../../../../../../api/project/ProjectsAPI';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

class PartEnergySupplierExcelNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            excel: {
                revenuePartId: props.params.revenuePartId,
                energySupplierId: 0,
                documentName: '',
                distributions: [],
                distributionPartsKwhIds: props.reportEnergySupplierExcel
                    ? props.reportEnergySupplierExcel.distributionPartsKwhIds
                    : [],
            },
            isLoading: false,
            errors: {
                energySupplierId: false,
                documentName: false,
            },
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        ProjectsAPI.peekDistributionsKwhPartsById(this.props.reportEnergySupplierExcel.distributionPartsKwhIds).then(
            payload => {
                this.setState({
                    ...this.state,
                    excel: {
                        ...this.state.excel,
                        distributions: payload.data,
                    },
                });
            }
        );
    }

    componentWillUnmount() {
        this.props.clearEnergySupplierExcelReportKwh();
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
            RevenuePartsKwhAPI.createEnergySupplierExcel(
                excel.revenuePartId,
                excel.energySupplierId,
                excel.documentName,
                excel.distributionPartsKwhIds
            ).then(payload => {
                hashHistory.push(`/documenten`);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <PartEnergySupplierExcelNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <PartEnergySupplierExcelNew
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

const mapStateToProps = state => {
    return {
        reportEnergySupplierExcel: state.revenuesKwhReportEnergySupplierExcel,
    };
};

const mapDispatchToProps = dispatch => ({
    clearEnergySupplierExcelReportKwh: () => {
        dispatch(clearEnergySupplierExcelReportKwh());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PartEnergySupplierExcelNewApp);
