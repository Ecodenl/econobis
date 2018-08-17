import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactGroupsListItem from './ContactGroupsListItem';
import ContactGroupsDeleteItem from './ContactGroupsDeleteItem';
import ContactGroupsListHead from "./ContactGroupsListHead";
import ContactGroupsListFilter from "./ContactGroupsListFilter";
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

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

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

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
        const { data = [], meta = {}, isLoading } = this.props.contactGroups;

        return (
        <div>
            <form onKeyUp={this.handleKeyUp} onSubmit={this.handleKeyUp}>
            <DataTable>
                <DataTableHead>
                    <ContactGroupsListHead
                        fetchContactGroupsData={() => this.props.fetchContactGroupsData()}
                    />
                    <ContactGroupsListFilter
                        onSubmitFilter={this.props.onSubmitFilter}
                    />
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={11}>Geen groepen gevonden!</td>
                            </tr>
                        ) : (
                            data.map(contactGroup => (
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
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.contactGroupsPagination.page}
                    />
                </div>
            {
                this.state.showDeleteItem &&
                <ContactGroupsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    {...this.state.deleteItem}
                    resetContactGroupsFilters={() => this.props.resetContactGroupsFilters() }
                />
            }
            </form>
        </div>
        )
    }
};

export default ContactGroupsList;
