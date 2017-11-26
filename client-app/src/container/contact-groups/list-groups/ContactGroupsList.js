import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import ContactGroupsListItem from './ContactGroupsListItem';
import ContactGroupsDeleteItem from './ContactGroupsDeleteItem';

class ContactGroupsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: ''
            }
        };
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id: id,
                name: name
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
                name: ''
            }
        });
    };

    render() {
        return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-quaternary">
                        <DataTableHeadTitle title={'Naam'} width={'40%'}/>
                        <DataTableHeadTitle title={'Aantal leden'} width={'20%'}/>
                        <DataTableHeadTitle title={'Status'} width={'35%'}/>
                        <DataTableHeadTitle title={''} width={'5%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        this.props.contactGroups.length === 0 ? (
                            <tr>
                                <td colSpan={11}>Geen groepen gevonden!</td>
                            </tr>
                        ) : (
                            this.props.contactGroups.map(contactGroup => (
                                <ContactGroupsListItem
                                key={contactGroup.id}
                                {...contactGroup}
                                showDeleteItemModal={this.showDeleteItemModal}
                            />
                            ))
                        )
                    }
                </DataTableBody>
            </DataTable>
            {
                this.state.showDeleteItem &&
                <ContactGroupsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    {...this.state.deleteItem}
                />
            }
        </div>
        )
    }
};

export default ContactGroupsList;
