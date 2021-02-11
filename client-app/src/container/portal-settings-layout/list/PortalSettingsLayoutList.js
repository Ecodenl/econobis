import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import PortalSettingsLayoutListItem from './PortalSettingsLayoutListItem';
import PortalSettingsLayoutDeleteItem from './PortalSettingsLayoutDeleteItem';

import * as PropTypes from 'prop-types';

class PortalSettingsLayoutList extends Component {
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
        let { portalSettingsLayouts, hasError, isLoading } = this.props;
        let loadingText = '';
        let loading = true;

        if (hasError) {
            loadingText = 'Fout bij het ophalen van portal instellingen layouts.';
        } else if (isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (portalSettingsLayouts.length === 0) {
            loadingText = 'Geen portal instellingen layouts gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Omschrijving'} width={'65%'} />
                            <DataTableHeadTitle title={'Standaard'} width={'30%'} />
                            <DataTableHeadTitle title={''} width={'5%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>{loadingText}</td>
                            </tr>
                        ) : (
                            portalSettingsLayouts.map(portalSettingsLayout => {
                                return (
                                    <PortalSettingsLayoutListItem
                                        key={portalSettingsLayout.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...portalSettingsLayout}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                {this.state.showDeleteItem && (
                    <PortalSettingsLayoutDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                        deletePortalSettingsLayout={this.props.deletePortalSettingsLayout}
                    />
                )}
            </div>
        );
    }
}

PortalSettingsLayoutList.propTypes = {
    portalSettingsLayouts: PropTypes.any,
    hasError: PropTypes.any,
    isLoading: PropTypes.any,
};

export default PortalSettingsLayoutList;
