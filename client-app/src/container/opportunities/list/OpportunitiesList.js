import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';

import OpportunitiesListItem from './OpportunitiesListItem';
import OpportunityDeleteItem from './OpportunityDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import OpportunitiesListHead from './OpportunitiesListHead';
import OpportunitiesListFilter from './OpportunitiesListFilter';
import { connect } from 'react-redux';

class OpportunitiesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                contactName: '',
                measureCategoryName: '',
            },
        };
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, contactName, measureCategoryName) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id: id,
                contactName: contactName,
                measureCategoryName: measureCategoryName,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                contactName: '',
                measureCategoryName: '',
            },
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.opportunities;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van kansen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen kansen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <OpportunitiesListHead fetchOpportunitiesData={() => this.props.fetchOpportunitiesData()} />

                            <OpportunitiesListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                                showCheckboxList={this.props.showCheckboxList}
                                checkedAllCheckboxes={this.props.checkedAllCheckboxes}
                                selectAllCheckboxes={this.props.selectAllCheckboxes}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(opportunities => (
                                    <OpportunitiesListItem
                                        key={opportunities.id}
                                        {...opportunities}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        showCheckbox={this.props.showCheckboxList}
                                        checkedAllCheckboxes={this.props.checkedAllCheckboxes}
                                    />
                                ))
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.opportunitiesPagination.page}
                        />
                    </div>
                    {this.state.showDeleteItem && (
                        <OpportunityDeleteItem
                            closeDeleteItemModal={this.closeDeleteItemModal}
                            fetchOpportunitiesData={this.props.fetchOpportunitiesData}
                            {...this.state.deleteItem}
                        />
                    )}
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

export default connect(mapStateToProps)(OpportunitiesList);
