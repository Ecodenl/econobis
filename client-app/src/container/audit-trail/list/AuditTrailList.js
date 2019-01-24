import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import AuditTrailListHead from './AuditTrailListHead';
import AuditTrailListFilter from './AuditTrailListFilter';
import AuditTrailListItem from './AuditTrailListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';

class AuditTrailList extends Component {
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
        const { data = [], meta = {} } = this.props.auditTrail;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van audit trail.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen audit trail gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <AuditTrailListHead fetchAuditTrailData={() => this.props.fetchAuditTrailData()} />
                            <AuditTrailListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                                models={this.props.models}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(auditTrail => {
                                    return <AuditTrailListItem key={auditTrail.id} {...auditTrail} />;
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.auditTrailPagination.page}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(AuditTrailList);
