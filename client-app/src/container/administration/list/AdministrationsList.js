import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import AdministrationsListItem from './AdministrationsListItem';
import AdministrationDeleteItem from './AdministrationDeleteItem';
import { connect } from 'react-redux';

class AdministrationsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            },
        };
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id,
                name,
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
                name: '',
            },
        });
    };

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van administraties.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.administrations.length === 0) {
            loadingText = 'Geen administraties gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={'40%'} />
                            <DataTableHeadTitle title={'Adres'} width={'25%'} />
                            <DataTableHeadTitle title={'Postcode'} width={'15%'} />
                            <DataTableHeadTitle title={'Plaats'} width={'15%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            this.props.administrations.map(administration => {
                                return (
                                    <AdministrationsListItem
                                        key={administration.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...administration}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>

                {this.state.showDeleteItem && (
                    <AdministrationDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                )}
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

export default connect(mapStateToProps)(AdministrationsList);
