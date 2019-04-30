import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsListHead from './ContactsListHead';
import ContactsListFilter from './ContactsListFilter';
import ContactsListItem from './ContactsListItem';
import ContactsDeleteItem from './ContactsDeleteItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { deleteContact } from '../../../actions/contact/ContactDetailsActions';
import { connect } from 'react-redux';

class ContactsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                fullName: '',
            },
        };
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id: id,
                fullName: name,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                fullName: '',
            },
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.contacts;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van contacten.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen contacten gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ContactsListHead
                                showCheckbox={this.props.showCheckboxList}
                                fetchContactsData={() => this.props.fetchContactsData()}
                            />
                            <ContactsListFilter
                                showCheckbox={this.props.showCheckboxList}
                                selectAllCheckboxes={() => this.props.selectAllCheckboxes()}
                                onSubmitFilter={this.props.onSubmitFilter}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={10}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(contact => {
                                    return (
                                        <ContactsListItem
                                            key={contact.id}
                                            {...contact}
                                            showCheckbox={this.props.showCheckboxList}
                                            checkedAllCheckboxes={this.props.checkedAllCheckboxes}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.contactsPagination.page}
                        />
                    </div>
                </form>
                {this.state.showDeleteItem && (
                    <ContactsDeleteItem closeDeleteItemModal={this.closeDeleteItemModal} {...this.state.deleteItem} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ContactsList);
