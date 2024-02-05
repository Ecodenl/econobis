import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import CampaignsListItem from './CampaignsListItem';
import CampaignsDeleteItem from './CampaignsDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';

class CampaignsList extends Component {
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
        const { data = [], meta = {} } = this.props.campaigns;
        const { permissions = {} } = this.props;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            if (!permissions.manageMarketing) {
                loadingText =
                    'Je moet de rol “marketingmedewerker” of “key-user” hebben om campagnes te kunnen inzien/aanpassen vraag jou admin/key-user om jou deze rechten via instellingen > gebruikers te geven indien nodig.';
            } else {
                loadingText = 'Fout bij het ophalen van campagnes.';
            }
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen campagnes gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title-quaternary">
                            <DataTableHeadTitle title={'Nummer'} width={'10%'} />
                            <DataTableHeadTitle title={'Begindatum'} width={'10%'} />
                            <DataTableHeadTitle title={'Einddatum'} width={'10%'} />
                            <DataTableHeadTitle title={'Naam'} width={'20%'} />
                            <DataTableHeadTitle title={'Type'} width={'20%'} />
                            <DataTableHeadTitle title={'Status'} width={'10%'} />
                            <DataTableHeadTitle title={'Aantal responses'} width={'14%'} />
                            <DataTableHeadTitle title={''} width={'6%'} />
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={9}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(campaign => (
                                <CampaignsListItem
                                    key={campaign.id}
                                    {...campaign}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                />
                            ))
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.campaignsPagination.page}
                    />
                </div>
                {this.state.showDeleteItem && (
                    <CampaignsDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        fetchCampaignsData={this.props.fetchCampaignsData}
                        {...this.state.deleteItem}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaigns: state.campaigns.list,
        campaignsPagination: state.campaigns.pagination,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(CampaignsList);
