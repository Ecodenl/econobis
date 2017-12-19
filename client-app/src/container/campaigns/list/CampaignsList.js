import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import CampaignsListItem from './CampaignsListItem';
import CampaignsDeleteItem from './CampaignsDeleteItem';

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
                        this.props.campaigns.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Geen campagnes gevonden!</td>
                            </tr>
                        ) : (
                            this.props.campaigns.map(campaign => (
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
            {
                this.state.showDeleteItem &&
                <CampaignsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    {...this.state.deleteItem}
                />
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns,
    };
};

export default connect(mapStateToProps, null)(CampaignsList);

