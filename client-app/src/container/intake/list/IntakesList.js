import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import IntakesListHead from './IntakesListHead';
import IntakesListFilter from './IntakesListFilter';
import IntakesListItem from './IntakesListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class IntakesList extends Component {
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
        const { data = [], meta = {}, isLoading } = this.props.intakes;

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <IntakesListHead
                            refreshIntakesData={() => this.props.refreshIntakesData()}
                        />
                        <IntakesListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            data.length === 0 ? (
                                <tr><td colSpan={6}>Geen intakes gevonden!</td></tr>
                            ) : (
                                data.map((intake) => {
                                    return <IntakesListItem
                                        key={intake.id}
                                        {...intake}
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
                        initialPage={this.props.intakesPagination.page}
                    />
                </div>
            </form>
        );
    };
}

export default IntakesList;
