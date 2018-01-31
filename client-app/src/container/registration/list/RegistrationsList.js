import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import RegistrationsListHead from './RegistrationsListHead';
import RegistrationsListFilter from './RegistrationsListFilter';
import RegistrationsListItem from './RegistrationsListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class RegistrationsList extends Component {
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
        const { data = [], meta = {}, isLoading } = this.props.registrations;

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <RegistrationsListHead
                            refreshRegistrationsData={() => this.props.refreshRegistrationsData()}
                        />
                        <RegistrationsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            data.length === 0 ? (
                                <tr><td colSpan={7}>Geen aanmeldingen gevonden!</td></tr>
                            ) : (
                                data.map((registration) => {
                                    return <RegistrationsListItem
                                        key={registration.id}
                                        {...registration}
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
                        initialPage={this.props.registrationsPagination.page}
                    />
                </div>
            </form>
        );
    };
}

export default RegistrationsList;
