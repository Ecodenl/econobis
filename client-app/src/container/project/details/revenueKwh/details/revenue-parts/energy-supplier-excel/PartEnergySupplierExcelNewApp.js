import React, { Component } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

import PartEnergySupplierExcelNewToolbar from './PartEnergySupplierExcelNewToolbar';
import PartEnergySupplierExcelNew from './PartEnergySupplierExcelNew';

import Panel from '../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../components/panel/PanelBody';
import RevenuePartsKwhAPI from '../../../../../../../api/project/RevenuePartsKwhAPI';

// Functionele wrapper voor de class component
const PartEnergySupplierExcelNewAppWrapper = props => {
    const navigate = useNavigate();
    return <PartEnergySupplierExcelNewApp {...props} navigate={navigate} />;
};

class PartEnergySupplierExcelNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revenuePartsKwhForReport: {},
            excel: {
                revenuePartId: props.params.revenuePartId,
                documentName: '',
            },
            isLoading: false,
            isCreating: false,
            errors: {
                energySupplierId: false,
                documentName: false,
            },
            errorMessage: {
                energySupplierId: '',
                documentName: '',
            },
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        RevenuePartsKwhAPI.fetchRevenuePartsKwhForReport(this.props.params.revenuePartId)
            .then(payload => {
                this.setState({
                    ...this.state,
                    revenuePartsKwhForReport: payload,
                    excel: {
                        ...this.state.excel,
                        documentName: payload.defaultDocumentName,
                    },
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
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
        this.props.navigate(
            `project/opbrengst-kwh/${this.state.revenuePartsKwhForReport.revenueId}/deelperiode/${this.props.params.revenuePartId}`
        );
    };

    handleSubmit = event => {
        event.preventDefault();

        const { excel } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(excel.documentName + '')) {
            errors.documentName = true;
            errorMessage.documentName = 'Bestandsnaam mag niet leeg zijn';
            hasErrors = true;
        }

        if (!hasErrors) {
            this.setState({ ...this.state, isCreating: true, errors: errors, errorMessage: errorMessage });
            RevenuePartsKwhAPI.createEnergySupplierExcel(excel.revenuePartId, excel.documentName)
                .then(payload => {
                    this.setState({ ...this.state, isCreating: false });
                    this.props.navigate(`/documenten`);
                })
                .catch(error => {
                    this.setState({ isCreating: false });
                });
        } else {
            this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <PartEnergySupplierExcelNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <>
                            {this.state.isCreating ? (
                                <div>Bezig met verwerken...</div>
                            ) : this.state.isLoading ? (
                                <div>Bezig met laden...</div>
                            ) : (
                                <Panel>
                                    <PanelBody>
                                        <div className="col-md-12">
                                            <PartEnergySupplierExcelNew
                                                revenuePartsKwhForReport={this.state.revenuePartsKwhForReport}
                                                documentName={this.state.excel.documentName}
                                                errors={this.state.errors}
                                                errorMessage={this.state.errorMessage}
                                                handleInputChange={this.handleInputChange}
                                                handleSubmit={this.handleSubmit}
                                                cancel={this.cancel}
                                            />
                                        </div>
                                    </PanelBody>
                                </Panel>
                            )}
                        </>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default PartEnergySupplierExcelNewAppWrapper;
