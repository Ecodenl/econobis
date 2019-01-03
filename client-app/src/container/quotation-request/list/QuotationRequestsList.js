import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import QuotationRequestsListHead from './QuotationRequestsListHead';
import QuotationRequestsListFilter from './QuotationRequestsListFilter';
import QuotationRequestsListItem from './QuotationRequestsListItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";
import {connect} from "react-redux";

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
        const { data = [], meta = {} } = this.props.quotationRequests;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van offerteverzoeken.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (data.length === 0) {
            loadingText = 'Geen offerteverzoeken gevonden!';
        }
        else {
            loading = false;
        }

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
                            loading ? (
                                <tr><td colSpan={10}>{loadingText}</td></tr>
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(QuotationRequestsList);
