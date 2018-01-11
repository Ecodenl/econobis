import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsListHead from './ContactsListHead';
import ContactsListFilter from './ContactsListFilter';
import ContactsListItem from './ContactsListItem';
import ContactsDeleteItem from './ContactsDeleteItem';

class ContactsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                fullName: ''
            }
        };
    }

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
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
                fullName: name
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
                fullName: ''
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.contacts;

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ContactsListHead
                                showCheckbox={this.props.showCheckboxList}
                                refreshContactsData={() => this.props.refreshContactsData()}
                            />
                            <ContactsListFilter
                                showCheckbox={this.props.showCheckboxList}
                                selectAllCheckboxes={() => this.props.selectAllCheckboxes()}
                                onSubmitFilter={this.props.onSubmitFilter}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                data.length === 0 ? (
                                    <tr><td colSpan={11}>Geen contacten gevonden!</td></tr>
                                ) : (
                                    data.map((contact) => {
                                        return <ContactsListItem
                                            key={contact.id}
                                            {...contact}
                                            showCheckbox={this.props.showCheckboxList}
                                            checkedAllCheckboxes={this.props.checkedAllCheckboxes}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    })
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-4 col-md-offset-4">
                        <ReactPaginate
                            onPageChange={this.props.handlePageClick}
                            pageCount={ Math.ceil(meta.total / 20) }
                            pageRangeDisplayed={20}
                            marginPagesDisplayed={2}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            previousLabel={<span aria-hidden="true">&laquo;</span>}
                            nextLabel={<span aria-hidden='true'>&raquo;</span>}
                            initialPage={this.props.contactsPagination.page || 0}
                            forcePage={this.props.contactsPagination.page}
                        />
                    </div>
                    <div className="col-md-4">
                        <div className="pull-right">Resultaten: { meta.total || 0 }</div>
                    </div>
                </form>
                {
                    this.state.showDeleteItem &&
                        <ContactsDeleteItem
                            closeDeleteItemModal={this.closeDeleteItemModal}
                            {...this.state.deleteItem}
                        />
                }
            </div>
        );
    }
};

export default ContactsList;