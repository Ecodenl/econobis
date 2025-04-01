import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import AddressDonglesListHead from './AddressDonglesListHead';
import AddressDonglesListFilter from './AddressDonglesListFilter';
import AddressDonglesListItem from './AddressDonglesListItem';

class AddressDonglesList extends Component {
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
        let { data = [], meta = {}, hasError, isLoading } = this.props.addressDongles;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van dongles.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen dongels gevonden!';
        } else {
            loading = false;
        }

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <AddressDonglesListHead
                            refreshAddressDonglesData={() => this.props.refreshAddressDonglesData()}
                            showCheckboxList={this.props.showCheckboxList}
                            toggleCheckedAll={this.props.toggleCheckedAll}
                        />
                        {!this.props.showCheckboxList ? (
                            <AddressDonglesListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                                showCheckboxList={this.props.showCheckboxList}
                            />
                        ) : (
                            <tr className="thead-filter">
                                <th colSpan={10}>
                                    <div className="alert alert-success">
                                        Geselecteerde dongels: {this.props.numberSelectedNumberTotal}
                                    </div>
                                </th>
                            </tr>
                        )}
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={10}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(addressDongle => {
                                return (
                                    <AddressDonglesListItem
                                        key={addressDongle.id}
                                        {...addressDongle}
                                        showCheckboxList={this.props.showCheckboxList}
                                        checkedAll={this.props.checkedAll}
                                        toggleAddressDongleCheck={this.props.toggleAddressDongleCheck}
                                        addressDongleIds={this.props.addressDongleIds}
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
                        initialPage={this.props.addressDonglesPagination.page}
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

export default connect(mapStateToProps, null)(AddressDonglesList);
