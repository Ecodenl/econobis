import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import WebformsListItem from './WebformsListItem';
import WebformDeleteItem from "./WebformDeleteItem";

class WebformsList extends Component {
    constructor(props) {
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
                        <tr className="thead-title">
                            <DataTableHeadTitle title={'Naam'} width={"30%"}/>
                            <DataTableHeadTitle title={'Sleutel'} width={"30%"}/>
                            <DataTableHeadTitle title={'Aanvragen per minuut'} width={"20%"}/>
                            <DataTableHeadTitle title={'Gemaakt op'} width={"15%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.webforms.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Geen webformulieren gevonden!</td>
                                </tr>
                            ) : (
                                this.props.webforms.map((team) => {
                                    return <WebformsListItem
                                        key={team.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...team}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <WebformDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

export default WebformsList;