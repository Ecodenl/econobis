import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import AuditTrailListHead from './AuditTrailListHead';
import AuditTrailListFilter from './AuditTrailListFilter';
import AuditTrailListItem from './AuditTrailListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class AuditTrailList extends Component {
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
        const { data = [], meta = {}, isLoading } = this.props.auditTrail;

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <AuditTrailListHead
                                fetchAuditTrailData={() => this.props.fetchAuditTrailData()}
                            />
                            <AuditTrailListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                                models={this.props.models}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                data.length === 0 ? (
                                    <tr><td colSpan={6}>Geen audit trail gevonden!</td></tr>
                                ) : (
                                    data.map((auditTrail) => {
                                        return <AuditTrailListItem
                                            key={auditTrail.id}
                                            {...auditTrail}
                                        />
                                    })
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.contactsPagination.page}
                        />
                    </div>
                </form>
            </div>
        );
    };
}

export default AuditTrailList;