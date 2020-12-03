import React, { Component } from 'react';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../../components/dataTable/DataTableHeadTitle';
import FinancialOverviewListItem from './FinancialOverviewListItem';
import FinancialOverviewDeleteItem from './FinancialOverviewDeleteItem';

import * as PropTypes from 'prop-types';

class FinancialOverviewList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                description: '',
            },
        };
    }

    showDeleteItemModal = (id, description) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id,
                description,
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
                description: '',
            },
        });
    };

    render() {
        let { financialOverviews, hasError, isLoading } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van waardestaten.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (financialOverviews.length === 0) {
            loadingText = 'Geen waardestaten gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Jaar'} width={'20%'} />
                            <DataTableHeadTitle title={'Administratie'} width={'55%'} />
                            <DataTableHeadTitle title={'Definitief'} width={'20%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            financialOverviews.map(financialOverview => {
                                return (
                                    <FinancialOverviewListItem
                                        key={financialOverview.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...financialOverview}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                {this.state.showDeleteItem && (
                    <FinancialOverviewDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                        deleteFinancialOverview={this.props.deleteFinancialOverview}
                    />
                )}
            </div>
        );
    }
}

FinancialOverviewList.propTypes = {
    financialOverviews: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
};

export default FinancialOverviewList;
