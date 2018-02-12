import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import HousingFilesListHead from './HousingFilesListHead';
import HousingFilesListFilter from './HousingFilesListFilter';
import HousingFilesListItem from './HousingFilesListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class HousingFilesList extends Component {
    constructor(props){
        super(props);
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.housingFiles;

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <HousingFilesListHead
                            refreshHousingFilesData={() => this.props.refreshHousingFilesData()}
                        />
                        <HousingFilesListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            data.length === 0 ? (
                                <tr><td colSpan={6}>Geen woningdossiers gevonden!</td></tr>
                            ) : (
                                data.map((housingFile) => {
                                    return <HousingFilesListItem
                                        key={housingFile.id}
                                        {...housingFile}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>
                <div className="col-md-4 col-md-offset-4">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.housingFilesPagination.page}
                    />
                </div>
            </form>
        );
    };
}

export default HousingFilesList;
