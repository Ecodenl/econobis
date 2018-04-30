import React, {Component} from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import AdministrationsListItem from './AdministrationsListItem';
import AdministrationDeleteItem from "./AdministrationDeleteItem";

class AdministrationsList extends Component {
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
                            <DataTableHeadTitle title={'Naam'} width={"40%"}/>
                            <DataTableHeadTitle title={'Adres'} width={"25%"}/>
                            <DataTableHeadTitle title={'Postcode'} width={"15%"}/>
                            <DataTableHeadTitle title={'Plaats'} width={"15%"}/>
                            <DataTableHeadTitle title={''} width={"5%"}/>
                        </tr>
                    </DataTableHead>
                    <DataTableBody>
                        {
                            this.props.administrations.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Geen administraties gevonden!</td>
                                </tr>
                            ) : (
                                this.props.administrations.map((administration) => {
                                    return <AdministrationsListItem
                                        key={administration.id}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        {...administration}
                                    />
                                })
                            )
                        }
                    </DataTableBody>
                </DataTable>

                {
                    this.state.showDeleteItem &&
                    <AdministrationDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        {...this.state.deleteItem}
                    />
                }
            </div>
        );
    }
};

export default AdministrationsList;