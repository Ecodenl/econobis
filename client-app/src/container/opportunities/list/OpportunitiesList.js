import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import OpportunitiesListItem from './OpportunitiesListItem';
import OpportunityDeleteItem from './OpportunityDeleteItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class OpportunitiesList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                contactName: '',
                measureName: ''
            }
        };

    }

    showDeleteItemModal = (id, contactName, measureName) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id: id,
                contactName: contactName,
                measureName: measureName
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
                contactName: '',
                measureName: ''
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.opportunities;

        return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-quaternary">
                        <DataTableHeadTitle title={'Nummer'} width={'10%'}/>
                        <DataTableHeadTitle title={'Datum'} width={'20%'}/>
                        <DataTableHeadTitle title={'Naam'} width={'20%'}/>
                        <DataTableHeadTitle title={'Maatregel'} width={'17%'}/>
                        <DataTableHeadTitle title={'Campagne'} width={'10%'}/>
                        <DataTableHeadTitle title={'Status'} width={'10%'}/>
                        <DataTableHeadTitle title={'Aantal offertes'} width={'7%'}/>
                        <DataTableHeadTitle title={''} width={'6%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Geen kansen gevonden!</td>
                            </tr>
                        ) : (
                            data.map(opportunities => (
                                <OpportunitiesListItem
                                    key={opportunities.id}
                                    {...opportunities}
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
                    initialPage={this.props.opportunitiesPagination.page}
                />
            </div>
            {
                this.state.showDeleteItem &&
                <OpportunityDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    fetchOpportunitiesData={this.props.fetchOpportunitiesData}
                    {...this.state.deleteItem}
                />
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        opportunities: state.opportunities.list,
        opportunitiesPagination: state.opportunities.pagination,
    };
};

export default connect(mapStateToProps, null)(OpportunitiesList);

