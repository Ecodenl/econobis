import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import OpportunitiesListItem from './OpportunitiesListItem';
import OpportunityDeleteItem from './OpportunityDeleteItem';

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
        return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-quaternary">
                        <DataTableHeadTitle title={'Nummer'} width={'10%'}/>
                        <DataTableHeadTitle title={'Datum'} width={'20%'}/>
                        <DataTableHeadTitle title={'Naam'} width={'20%'}/>
                        <DataTableHeadTitle title={'Maatregel'} width={'10%'}/>
                        <DataTableHeadTitle title={'Campagne'} width={'10%'}/>
                        <DataTableHeadTitle title={'Status'} width={'10%'}/>
                        <DataTableHeadTitle title={'Aantal offertes'} width={'7%'}/>
                        <DataTableHeadTitle title={'Gerelateerde kansen'} width={'7%'}/>
                        <DataTableHeadTitle title={''} width={'6%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        this.props.opportunities.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Geen kansen gevonden!</td>
                            </tr>
                        ) : (
                            this.props.opportunities.map(opportunities => (
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
            {
                this.state.showDeleteItem &&
                <OpportunityDeleteItem
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
        opportunities: state.opportunities,
    };
};

export default connect(mapStateToProps, null)(OpportunitiesList);

