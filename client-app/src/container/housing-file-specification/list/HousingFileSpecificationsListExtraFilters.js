import React, { Component } from 'react';

import Modal from '../../../components/modal/Modal';
import DataTableCustomFilter from '../../../components/dataTable/DataTableCustomFilter';
import ButtonText from '../../../components/button/ButtonText';
import { connect } from 'react-redux';

class HousingFileSpecificationsListExtraFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // filterType: props.filterType,
            // contactType: props.contactType,
            // amountOfFilters: props.amountOfFilters,
            filters: props.extraFilters,
            yesNoOptions: [
                {
                    id: 0,
                    name: 'Nee',
                },
                {
                    id: 1,
                    name: 'Ja',
                },
            ],
        };

        this.closeModal = this.closeModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    }

    closeModal() {
        this.props.toggleShowExtraFilters();
    }

    confirmAction() {
        this.props.handleExtraFiltersChange(this.state.filters);
    }

    handleFilterFieldChange(data, filterNumber) {
        let filters = this.state.filters;

        filters[filterNumber].field = data;
        filters[filterNumber].data = '';

        this.setState({
            ...this.state,
            filters,
        });
    }

    handleFilterValueChange(field, data, filterNumber) {
        let filters = this.state.filters;

        filters[filterNumber][field] = data;

        this.setState({
            ...this.state,
            filters,
        });
    }

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
                buttonConfirmText="Toepassen"
                confirmAction={this.confirmAction}
                closeModal={this.closeModal}
                buttonCancelText={'Sluiten'}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-md-4">Zoekveld</th>
                            <th className="col-md-3" />
                            <th className="col-md-4">Waarde</th>
                            <th className="col-md-1" />
                        </tr>
                    </thead>
                    {this.state.filters.length === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={4}>Geen filters gezet.</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td className="col-md-4">Waarde / antwoord</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Verdieping</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Zijde</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Type/Merk</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Uitvoering</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Besparing gas</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">Besparing electriciteit</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                            <tr>
                                <td className="col-md-4">CO2 besparing</td>
                                <td className="col-md-3" />
                                <td className="col-md-4"></td>
                                <td className="col-md-1" />
                            </tr>
                        </tbody>
                    )}
                </table>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        // housingFileHoomLinks: state.systemData.housingFileHoomLinks,
    };
};

export default connect(mapStateToProps)(HousingFileSpecificationsListExtraFilters);
