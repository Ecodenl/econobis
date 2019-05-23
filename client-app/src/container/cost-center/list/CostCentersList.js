import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import CostCentersListItem from './CostCentersListItem';
import CostCenterDeleteItem from "./CostCenterDeleteItem";

import * as PropTypes from "prop-types";

class CostCentersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                description: '',
            }
        };
    }

    showDeleteItemModal = (id, description) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                description,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                description: '',
            }
        });
    };

    render() {
        let {costCenters, hasError, isLoading} = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van kostenplaatsen.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (costCenters.length === 0) {
            loadingText = 'Geen kostenplaatsen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Omschrijving'} width={'60%'}/>
                            <DataTableHeadTitle title={'Nummer'} width={'30%'}/>
                            <DataTableHeadTitle title={''} width={'10%'}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            costCenters.map(costCenter => {
                                return <CostCentersListItem
                                    key={costCenter.id}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                    {...costCenter}
                                />;
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                {
                    this.state.showDeleteItem &&
                    <CostCenterDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                        deleteCostCenter={this.props.deleteCostCenter}
                    />
                }
            </div>
        );
    }
}

CostCentersList.propTypes = {
    costCenters: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any
}

export default CostCentersList;
