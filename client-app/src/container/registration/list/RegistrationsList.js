import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import RegistrationsListHead from './RegistrationsListHead';
import RegistrationsListFilter from './RegistrationsListFilter';
import RegistrationsListItem from './RegistrationsListItem';

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
                    <ReactPaginate
                        onPageChange={this.props.handlePageClick}
                        pageCount={ Math.ceil(meta.total / 20) }
                        pageRangeDisplayed={20}
                        marginPagesDisplayed={2}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        previousLabel={<span aria-hidden="true">&laquo;</span>}
                        nextLabel={<span aria-hidden='true'>&raquo;</span>}
                        initialPage={this.props.registrationsPagination.page || 0}
                        forcePage={this.props.registrationsPagination.page}
                    />
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: { meta.total || 0 }</div>
                </div>
            </form>
        );
    };
}

export default RegistrationsList;
