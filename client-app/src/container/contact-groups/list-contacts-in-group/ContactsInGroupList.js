import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsInGroupListHead from './ContactsInGroupListHead';
import ContactsInGroupListItem from './ContactsInGroupListItem';
import ContactsInGroupDeleteItem from './ContactsInGroupDeleteItem';
import {connect} from "react-redux";

class ContactsInGroupList extends Component {
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

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van contact in groep.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (this.props.contactsInGroup.length === 0) {
            loadingText = 'Geen contact in groep gevonden!';
        }
        else {
            loading = false;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <span>Totaal leden in groep: <strong>{this.props.contactsInGroup.length}</strong></span>
                    </div>
                </div>
                <form onKeyUp={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ContactsInGroupListHead
                                showCheckbox={this.props.showCheckboxList}
                                refreshContactsInGroupData={() => this.props.refreshContactsInGroupData()}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                loading ? (
                                    <tr><td colSpan={10}>{loadingText}</td></tr>
                                ) : (
                                    this.props.contactsInGroup.map((contactInGroup) => {
                                        return <ContactsInGroupListItem
                                            key={contactInGroup.id}
                                            {...contactInGroup}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    })
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                </form>
                {
                    this.state.showDeleteItem &&
                        <ContactsInGroupDeleteItem
                            closeDeleteItemModal={this.closeDeleteItemModal}
                            groupId = {this.props.groupId}
                            {...this.state.deleteItem}
                        />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(ContactsInGroupList);