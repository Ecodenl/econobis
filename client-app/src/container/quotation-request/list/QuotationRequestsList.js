import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import QuotationRequestsListHead from './QuotationRequestsListHead';
import QuotationRequestsListFilter from './QuotationRequestsListFilter';
import QuotationRequestsListItem from './QuotationRequestsListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class QuotationRequestsList extends Component {
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
        const { data = [], meta = {}, isLoading } = this.props.quotationRequests;

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <QuotationRequestsListHead
                            refreshQuotationRequestsData={() => this.props.refreshQuotationRequestsData()}
                        />
                        <QuotationRequestsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {
                            data.length === 0 ? (
                                <tr><td colSpan={10}>Geen offerteverzoeken gevonden!</td></tr>
                            ) : (
                                data.map((quotationRequest) => {
                                    return <QuotationRequestsListItem
                                        key={quotationRequest.id}
                                        {...quotationRequest}
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
                        initialPage={this.props.quotationRequestsPagination.page}
                    />
                </div>
            </form>
        );
    };
}

export default QuotationRequestsList;
