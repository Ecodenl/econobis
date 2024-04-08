import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsInGroupListHead from './ContactsInGroupListHead';
import ContactsInGroupListItem from './ContactsInGroupListItem';
import ContactsInGroupDeleteItem from './ContactsInGroupDeleteItem';
import ContactsInGroupEditItem from './ContactsInGroupEditItem';
import { connect } from 'react-redux';

class ContactsInGroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            showEditItem: false,
            deleteItem: {
                id: '',
                fullName: '',
            },
            editItem: {
                id: '',
                emailAddress: '',
                memberToGroupSince: '',
            },
        };
    }

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

    showEditItemModal = (id, emailAddress, memberToGroupSince) => {
        this.setState({
            ...this.state,
            showEditItem: true,
            editItem: {
                ...this.state.editItem,
                id: id,
                emailAddress: emailAddress,
                memberToGroupSince: memberToGroupSince,
            },
        });
    };

    closeEditItemModal = () => {
        this.setState({
            ...this.state,
            showEditItem: false,
            editItem: {
                ...this.state.editItem,
                id: '',
                emailAddress: '',
                memberToGroupSince: '',
            },
        });
    };

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van contact in groep.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (this.props.contactsInGroup.length === 0) {
            loadingText = 'Geen contact in groep gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <span>
                            Totaal leden in groep: <strong>{this.props.contactsInGroup.length}</strong>
                        </span>
                    </div>
                </div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ContactsInGroupListHead
                                showCheckbox={this.props.showCheckboxList}
                                refreshContactsInGroupData={this.props.refreshContactsInGroupData}
                                isUsedInLaposta={this.props.contactGroupDetails.isUsedInLaposta}
                            />
                            {/*<ContactsInGroupListFilter*/}
                            {/*    showCheckbox={this.props.showCheckboxList}*/}
                            {/*    selectAllCheckboxes={() => this.props.selectAllCheckboxes()}*/}
                            {/*    onSubmitFilter={this.props.onSubmitFilter}*/}
                            {/*/>*/}
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={10}>{loadingText}</td>
                                </tr>
                            ) : (
                                this.props.contactsInGroup.map(contactInGroup => {
                                    return (
                                        <ContactsInGroupListItem
                                            key={contactInGroup.id}
                                            {...contactInGroup}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                            showEditItemModal={this.showEditItemModal}
                                            groupId={this.props.groupId}
                                            isUsedInLaposta={this.props.contactGroupDetails.isUsedInLaposta}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                </form>
                {/*<div className="col-md-6 col-md-offset-3">*/}
                {/*    <DataTablePagination*/}
                {/*        onPageChangeAction={this.handlePageClick}*/}
                {/*        totalRecords={this.props.total}*/}
                {/*        recordsPerPage={50}*/}
                {/*    />*/}
                {/*</div>*/}
                {this.state.showDeleteItem && (
                    <ContactsInGroupDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        groupId={this.props.groupId}
                        {...this.state.deleteItem}
                    />
                )}
                {this.state.showEditItem && (
                    <ContactsInGroupEditItem
                        closeEditItemModal={this.closeEditItemModal}
                        groupId={this.props.groupId}
                        {...this.state.editItem}
                        refreshContactsInGroupData={this.props.refreshContactsInGroupData}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
        contactGroupDetails: state.contactGroupDetails,
    };
};

export default connect(mapStateToProps)(ContactsInGroupList);
