import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import MeasuresListItem from './MeasuresListItem';
import MeasuresDeleteItem from './MeasuresDeleteItem';

class MeasuresList extends Component {
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
                        <DataTableHeadTitle title={'Nummer'} width={'44%'}/>
                        <DataTableHeadTitle title={'Maatregel'} width={'44%'}/>
                        <DataTableHeadTitle title={''} width={'6%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        this.props.measures.length === 0 ? (
                            <tr>
                                <td colSpan={3}>Geen maatregelen gevonden!</td>
                            </tr>
                        ) : (
                            this.props.measures.map(measure => (
                                <MeasuresListItem
                                    key={measure.id}
                                    {...measure}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                />
                            ))
                        )
                    }
                </DataTableBody>
            </DataTable>
            {
                this.state.showDeleteItem &&
                <MeasuresDeleteItem
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
        measures: state.measures,
    };
};

export default connect(mapStateToProps, null)(MeasuresList);

