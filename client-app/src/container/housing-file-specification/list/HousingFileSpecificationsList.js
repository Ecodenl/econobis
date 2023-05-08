import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import HousingFileSpecificationsListHead from './HousingFileSpecificationsListHead';
import HousingFileSpecificationsListFilter from './HousingFileSpecificationsListFilter';
import HousingFileSpecificationsListItem from './HousingFileSpecificationsListItem';

import { connect } from 'react-redux';

class HousingFileSpecificationsList extends Component {
    constructor(props) {
        super(props);
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        let { data = [], meta = {}, hasError, isLoading } = this.props.housingFileSpecifications;
        let loadingText = '';
        let loading = true;
        if (hasError) {
            loadingText = 'Fout bij het ophalen van woningdossier specificaties.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen woningdossier specificaties gevonden!';
        } else {
            loading = false;
        }
        // const noDataText = 'Geen woningdossier specificaties bekend.';

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <HousingFileSpecificationsListHead
                            refreshHousingFileSpecificationsData={() =>
                                this.props.refreshHousingFileSpecificationsData()
                            }
                        />
                        <HousingFileSpecificationsListFilter onSubmitFilter={this.props.onSubmitFilter} />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={9}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(housingFileSpecification => {
                                return (
                                    <HousingFileSpecificationsListItem
                                        key={housingFileSpecification.id}
                                        {...housingFileSpecification}
                                        showCheckboxList={this.props.showCheckboxList}
                                        toggleSpecificationCheck={this.props.toggleSpecificationCheck}
                                        specificationIds={this.props.specificationIds}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-4 col-md-offset-4">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.housingFileSpecificationsPagination.page}
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(HousingFileSpecificationsList);
