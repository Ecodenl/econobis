import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../components/modal/Modal';

import {
    setFilterHousingFileSpecificationAnswer,
    setFilterHousingFileSpecificationFloor,
    setFilterHousingFileSpecificationSide,
    setFilterHousingFileSpecificationTypeBrand,
    setFilterHousingFileSpecificationTypeOfExecution,
    setFilterHousingFileSpecificationSavingsGasFrom,
    setFilterHousingFileSpecificationSavingsGasTill,
    setFilterHousingFileSpecificationSavingsElectricityFrom,
    setFilterHousingFileSpecificationSavingsElectricityTill,
    setFilterHousingFileSpecificationCo2SavingsFrom,
    setFilterHousingFileSpecificationCo2SavingsTill,
} from '../../../actions/housing-file-specification/HousingFileSpecificationsFiltersActions';

class HousingFileSpecificationsListExtraFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // yesNoOptions: [
            //     {
            //         id: 0,
            //         name: 'Nee',
            //     },
            //     {
            //         id: 1,
            //         name: 'Ja',
            //     },
            // ],
            typeOfExecutionOptions: [
                { id: 'Z', name: 'Zelf doen' },
                { id: 'L', name: 'Laten doen' },
            ],
        };

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.props.toggleShowExtraFilters();
    }

    onAnswerChange = e => {
        this.props.setFilterHousingFileSpecificationAnswer(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onFloorChange = e => {
        this.props.setFilterHousingFileSpecificationFloor(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onSideChange = e => {
        this.props.setFilterHousingFileSpecificationSide(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onTypeBrandChange = e => {
        this.props.setFilterHousingFileSpecificationTypeBrand(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onTypeOfExecutionChange = e => {
        this.props.setFilterHousingFileSpecificationTypeOfExecution(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onSavingsGasFromChange = e => {
        this.props.setFilterHousingFileSpecificationSavingsGasFrom(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onSavingsGasTillChange = e => {
        this.props.setFilterHousingFileSpecificationSavingsGasTill(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onSavingsElectricityFromChange = e => {
        this.props.setFilterHousingFileSpecificationSavingsElectricityFrom(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onSavingsElectricityTillChange = e => {
        this.props.setFilterHousingFileSpecificationSavingsElectricityTill(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onCo2SavingsFromChange = e => {
        this.props.setFilterHousingFileSpecificationCo2SavingsFrom(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };
    onCo2SavingsTillChange = e => {
        this.props.setFilterHousingFileSpecificationCo2SavingsTill(e.target.value);

        setTimeout(() => {
            this.props.onSubmitFilter();
        }, 100);
    };

    render() {
        const fields = {
            name: {
                name: 'Naam',
                type: 'stringWithoutNull',
            },
        };

        return (
            <Modal
                title="Extra filters"
                showConfirmAction={false}
                closeModal={this.closeModal}
                buttonCancelText={'Sluiten'}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-md-4">Zoekveld</th>
                            <th className="col-md-3">Waarde</th>
                            <td className="col-md-1" />
                            <th className="col-md-3" />
                            <th className="col-md-1" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-md-4">Waarde / antwoord</td>
                            <td className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    value={this.props.filters.answer.data}
                                    onChange={this.onAnswerChange}
                                />
                            </td>
                            <td className="col-md-1" />
                            <td className="col-md-3" />
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Verdieping</td>
                            <td className="col-md-3">
                                <select
                                    className="form-control input-sm"
                                    value={this.props.filters.floorId.data}
                                    onChange={this.onFloorChange}
                                >
                                    <option />
                                    {this.props.floors.map(floor => {
                                        return (
                                            <option key={floor.id} value={floor.id}>
                                                {floor.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                            <td className="col-md-1" />
                            <td className="col-md-3" />
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Zijde</td>
                            <td className="col-md-3">
                                <select
                                    className="form-control input-sm"
                                    value={this.props.filters.sideId.data}
                                    onChange={this.onSideChange}
                                >
                                    <option />
                                    {this.props.sides.map(side => {
                                        return (
                                            <option key={side.id} value={side.id}>
                                                {side.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                            <td className="col-md-1" />
                            <td className="col-md-3" />
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Type/Merk</td>
                            <td className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    value={this.props.filters.typeBrand.data}
                                    onChange={this.onTypeBrandChange}
                                />
                            </td>
                            <td className="col-md-3" />
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Uitvoering</td>
                            <td className="col-md-3">
                                <select
                                    className="form-control input-sm"
                                    value={this.props.filters.typeOfExecutionId.data}
                                    onChange={this.onTypeOfExecutionChange}
                                >
                                    <option />
                                    {this.state.typeOfExecutionOptions.map(typeOfExecution => {
                                        return (
                                            <option key={typeOfExecution.id} value={typeOfExecution.id}>
                                                {typeOfExecution.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                            <td className="col-md-1" />
                            <td className="col-md-3" />
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Besparing gas (range)</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.savingsGasFrom.data}
                                    onChange={this.onSavingsGasFromChange}
                                />
                            </td>
                            <td className="col-md-1">t/m</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.savingsGasTill.data}
                                    onChange={this.onSavingsGasTillChange}
                                />
                            </td>
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">Besparing elektriciteit (range)</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.savingsElectricityFrom.data}
                                    onChange={this.onSavingsElectricityFromChange}
                                />
                            </td>
                            <td className="col-md-1">t/m</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.savingsElectricityTill.data}
                                    onChange={this.onSavingsElectricityTillChange}
                                />
                            </td>
                            <td className="col-md-1" />
                        </tr>
                        <tr>
                            <td className="col-md-4">CO2 besparing (range)</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.co2SavingsFrom.data}
                                    onChange={this.onCo2SavingsFromChange}
                                />
                            </td>
                            <td className="col-md-1">t/m</td>
                            <td className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control input-sm"
                                    value={this.props.filters.co2SavingsTill.data}
                                    onChange={this.onCo2SavingsTillChange}
                                />
                            </td>
                            <td className="col-md-1" />
                        </tr>
                    </tbody>
                </table>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: state.housingFileSpecifications.filters,
        floors: state.systemData.housingFileSpecificationFloors,
        sides: state.systemData.housingFileSpecificationSides,
        // housingFileHoomLinks: state.systemData.housingFileHoomLinks,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterHousingFileSpecificationAnswer,
            setFilterHousingFileSpecificationFloor,
            setFilterHousingFileSpecificationSide,
            setFilterHousingFileSpecificationTypeBrand,
            setFilterHousingFileSpecificationTypeOfExecution,
            setFilterHousingFileSpecificationSavingsGasFrom,
            setFilterHousingFileSpecificationSavingsGasTill,
            setFilterHousingFileSpecificationSavingsElectricityFrom,
            setFilterHousingFileSpecificationSavingsElectricityTill,
            setFilterHousingFileSpecificationCo2SavingsFrom,
            setFilterHousingFileSpecificationCo2SavingsTill,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationsListExtraFilters);
