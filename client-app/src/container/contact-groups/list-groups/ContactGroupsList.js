import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactGroupsListItem from './ContactGroupsListItem';
import ContactGroupsDeleteItem from './ContactGroupsDeleteItem';
import ContactGroupsListHead from './ContactGroupsListHead';
import ContactGroupsListFilter from './ContactGroupsListFilter';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';
import Modal from "../../../components/modal/Modal";

class ContactGroupsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
                contactGroupType: '',
            },
            showPartOfComposedGroup: false,
        };
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        e.preventDefault();
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, name, contactGroupType) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id: id,
                name: name,
                contactGroupType: contactGroupType,
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
                name: '',
                contactGroupType: '',
            },
        });
    };

    showPartOfComposedGroupModal = (parentGroupsArray) => {
        this.setState({
            ...this.state,
            showPartOfComposedGroup: true,
            parentGroupsArray: parentGroupsArray,
        });
    };

    hidePartOfComposedGroup = () => {
        this.setState({
            showPartOfComposedGroup: false
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.contactGroups;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van groepen.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen groepen gevonden!';
        } else {
            loading = false;
        }

        return (
            <div>
                <form onKeyUp={this.handleKeyUp} onSubmit={this.handleKeyUp}>
                    <DataTable>
                        <DataTableHead>
                            <ContactGroupsListHead
                                fetchContactGroupsData={() => this.props.fetchContactGroupsData()}
                                useLaposta={meta.useLaposta}
                            />
                            <ContactGroupsListFilter
                                onSubmitFilter={this.props.onSubmitFilter}
                                useLaposta={meta.useLaposta}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={11}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(contactGroup => (
                                    <ContactGroupsListItem
                                        key={contactGroup.id}
                                        {...contactGroup}
                                        showDeleteItemModal={this.showDeleteItemModal}
                                        showPartOfComposedGroupModal={this.showPartOfComposedGroupModal}
                                        useLaposta={meta.useLaposta}
                                    />
                                ))
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.props.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.contactGroupsPagination.page}
                        />
                    </div>
                    {this.state.showDeleteItem && (
                        <ContactGroupsDeleteItem
                            closeDeleteItemModal={this.closeDeleteItemModal}
                            {...this.state.deleteItem}
                            resetContactGroupsFilters={() => this.props.resetContactGroupsFilters()}
                        />
                    )}
                </form>
                {this.state.showPartOfComposedGroup && (
                    <Modal
                        title={'Waarschuwing'}
                        closeModal={this.hidePartOfComposedGroup}
                        showConfirmAction={false}
                        buttonCancelText="Ok"
                    >
                        {'Je kan deze groep niet verwijderen omdat deze groep onderdeel is van een samengestelde groep. Verwijder eerst deze groep uit de samengestelde groep(en):'}
                        <ul>
                            {this.state.parentGroupsArray.map(parentGroupsArray => (
                                <li>
                                    {parentGroupsArray}
                                </li>
                            ))}
                        </ul>
                    </Modal>
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

export default connect(mapStateToProps)(ContactGroupsList);
