import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import PartEnergySupplierExcelNewToolbar from './PartEnergySupplierExcelNewToolbar';
import PartEnergySupplierExcelNew from './PartEnergySupplierExcelNew';

import Panel from '../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../components/panel/PanelBody';
import { connect } from 'react-redux';
import {
    clearEnergySupplierExcelReportKwh,
    fetchRevenuePartsKwh,
} from '../../../../../../../actions/project/ProjectDetailsActions';
import ProjectsAPI from '../../../../../../../api/project/ProjectsAPI';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

class PartEnergySupplierExcelNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            excel: {
                revenuePartId: props.params.revenuePartId,
                documentName: '',
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
        this.props.fetchRevenuePartsKwh(this.props.params.revenuePartId);
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
    cancel = event => {
        event.preventDefault();
        hashHistory.push(
            `project/opbrengst-kwh/${this.props.revenuePartsKwh.revenueId}/deelperiode/${this.props.params.revenuePartId}`
        );
    };

    handleSubmit = event => {
        event.preventDefault();

        const { excel } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(excel.documentName + '')) {
            errors.documentName = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            RevenuePartsKwhAPI.createEnergySupplierExcel(excel.revenuePartId, excel.documentName).then(payload => {
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
                                        documentName={this.state.excel.documentName}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleSubmit={this.handleSubmit}
                                        cancel={this.cancel}
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
        revenuePartsKwh: state.revenuePartsKwh,
        reportEnergySupplierExcel: state.revenuesKwhReportEnergySupplierExcel,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRevenuePartsKwh: id => {
        dispatch(fetchRevenuePartsKwh(id));
    },
    clearEnergySupplierExcelReportKwh: () => {
        dispatch(clearEnergySupplierExcelReportKwh());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PartEnergySupplierExcelNewApp);
