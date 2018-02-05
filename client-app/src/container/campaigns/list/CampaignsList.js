import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import CampaignsListItem from './CampaignsListItem';
import CampaignsDeleteItem from './CampaignsDeleteItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class CampaignsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            }
        };

    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                name: '',
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.campaigns;

        return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-quaternary">
                        <DataTableHeadTitle title={'Nummer'} width={'10%'}/>
                        <DataTableHeadTitle title={'Begin datum'} width={'10%'}/>
                        <DataTableHeadTitle title={'Eind datum'} width={'10%'}/>
                        <DataTableHeadTitle title={'Naam'} width={'20%'}/>
                        <DataTableHeadTitle title={'Type'} width={'20%'}/>
                        <DataTableHeadTitle title={'Status'} width={'10%'}/>
                        <DataTableHeadTitle title={'Aantal responses'} width={'14%'}/>
                        <DataTableHeadTitle title={''} width={'6%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Geen campagnes gevonden!</td>
                            </tr>
                        ) : (
                            data.map(campaign => (
                                <CampaignsListItem
                                    key={campaign.id}
                                    {...campaign}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                />
                            ))
                        )
                    }
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <DataTablePagination
                    onPageChangeAction={this.props.handlePageClick}
                    totalRecords={meta.total}
                    initialPage={this.props.campaignsPagination.page}
                />
            </div>
            {
                this.state.showDeleteItem &&
                <CampaignsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    fetchCampaignsData={this.props.fetchCampaignsData}
                    {...this.state.deleteItem}
                />
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns.list,
        campaignsPagination: state.campaigns.pagination,
    };
};

export default connect(mapStateToProps, null)(CampaignsList);

