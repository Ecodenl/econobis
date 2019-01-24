import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import IntakesListHead from './IntakesListHead';
import IntakesListFilter from './IntakesListFilter';
import IntakesListItem from './IntakesListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';

class IntakesList extends Component {
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
        const { data = [], meta = {} } = this.props.intakes;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van intakes.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen intakes gevonden!';
        } else {
            loading = false;
        }

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <IntakesListHead
                            showCheckbox={this.props.showCheckboxList}
                            refreshIntakesData={() => this.props.refreshIntakesData()}
                        />
                        <IntakesListFilter
                            showCheckbox={this.props.showCheckboxList}
                            selectAllCheckboxes={() => this.props.selectAllCheckboxes()}
                            onSubmitFilter={this.props.onSubmitFilter}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={6}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(intake => {
                                return (
                                    <IntakesListItem
                                        key={intake.id}
                                        {...intake}
                                        showCheckbox={this.props.showCheckboxList}
                                        checkedAllCheckboxes={this.props.checkedAllCheckboxes}
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
                        initialPage={this.props.intakesPagination.page}
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

export default connect(mapStateToProps)(IntakesList);
