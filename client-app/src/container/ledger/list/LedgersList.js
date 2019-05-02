import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import LedgersListItem from './LedgersListItem';
import LedgerDeleteItem from "./LedgerDeleteItem";

import * as PropTypes from "prop-types";

class LedgersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                description: '',
            }
        };
    }

    showDeleteItemModal = (id, description) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
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
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                description: '',
            }
        });
    };

    render() {
        let {ledgers, hasError, isLoading} = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van grootboekrekeningen.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (ledgers.length === 0) {
            loadingText = 'Geen grootboekrekeningen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Omschrijving'} width={'35%'}/>
                            <DataTableHeadTitle title={'BTW code'} width={'60%'}/>
                            <DataTableHeadTitle title={''} width={'5%'}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            ledgers.map(ledger => {
                                return <LedgersListItem
                                    key={ledger.id}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                    {...ledger}
                                />;
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                {
                    this.state.showDeleteItem &&
                    <LedgerDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                        deleteLedger={this.props.deleteLedger}
                    />
                }
            </div>
        );
    }
}

LedgersList.propTypes = {
    ledgers: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any
}

export default LedgersList;
