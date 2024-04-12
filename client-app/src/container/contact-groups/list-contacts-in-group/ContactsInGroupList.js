import React, { Component, useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsInGroupListHead from './ContactsInGroupListHead';
import ContactsInGroupListItem from './ContactsInGroupListItem';
import ContactsInGroupDeleteItem from './ContactsInGroupDeleteItem';
import ContactsInGroupEditItem from './ContactsInGroupEditItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import ContactsInGroupAPI from '../../../api/contact-group/ContactsInGroupAPI';
import ContactsInGroupListFilter from './ContactsInGroupListFilter';
import moment from 'moment/moment';

const recordsPerPage = 50;

function ContactsInGroupList({ groupId, refreshContactsInGroupData }) {
    const [contactGroupDetails, setContactGroupDetails] = useState([]);
    const [contactsInGroup, setContactsInGroup] = useState([]);
    const [showDeleteItem, setShowDeleteItem] = useState(false);
    const [showEditItem, setShowEditItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState({
        id: '',
        fullName: '',
    });
    const [editItem, setEditItem] = useState({
        id: '',
        emailAddress: '',
        memberToGroupSince: '',
    });
    // const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'fullName', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchContactGroupDetails();
        },
        [pagination.offset, sort]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchContactGroupDetails();
            }
        },
        [pressedEnter]
    );

    function fetchContactGroupDetails() {
        setIsLoading(true);
        setContactGroupDetails([]);

        axios
            .all([
                ContactGroupAPI.fetchContactGroupDetails(groupId),
                ContactsInGroupAPI.fetchContactsInGroup(groupId, formatFilterHelper(), sort, pagination),
            ])
            .then(
                axios.spread((payloadContactGroupDetails, payloadContactsInGroup) => {
                    setContactGroupDetails(payloadContactGroupDetails);
                    setContactsInGroup(payloadContactsInGroup.data.data);
                    setMetaData(payloadContactsInGroup.data.meta);

                    setIsLoading(false);
                })
            )
            .catch(error => {
                setIsLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function showDeleteItemModal(id, name) {
        setShowDeleteItem(true);
        setDeleteItem({
            id: id,
            fullName: name,
        });
    }

    function closeDeleteItemModal() {
        setShowDeleteItem(false);
        setDeleteItem({
            id: '',
            fullName: '',
        });
    }

    function showEditItemModal(id, emailAddress, memberToGroupSince) {
        setShowEditItem(true);
        setEditItem({
            id: id,
            emailAddress: emailAddress,
            memberToGroupSince: memberToGroupSince,
        });
    }

    function closeEditItemModal() {
        setShowEditItem(false);
        setEditItem({
            id: '',
            emailAddress: '',
            memberToGroupSince: '',
        });
    }

    function onSubmitFilter() {
        let page = 0;
        let offset = 0;
        setPagination({ ...pagination, page, offset });
    }

    function handlePageClick(page) {
        let offset = Math.ceil(page.selected * recordsPerPage);
        setPagination({ ...pagination, offset });
    }

    function handleChangeSort(column, value) {
        let originalSort = sort;
        if (originalSort.length === 3) originalSort.pop();

        let sortItem = { field: `${column}`, order: `${value}` };
        setSort([sortItem, ...originalSort]);
    }

    function handleChangeFilter(column, value) {
        setFilter({ ...filter, [column]: value });
        onSubmitFilter();
    }

    function formatFilterHelper() {
        let filters = [];
        if (filter.fullName) {
            filters.push({ field: 'fullName', data: filter.fullName });
        }

        if (filter.emailAddress) {
            filters.push({ field: 'emailAddress', data: filter.emailAddress });
        }
        return filters;
    }

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    let loadingText = '';
    let loading = true;

    // if (hasError) {
    //     loadingText = 'Fout bij het ophalen van contact in groep.';
    // } else if (isLoading) {
    if (isLoading) {
        loadingText = 'Gegevens (groep) aan het laden...';
    } else if (!contactsInGroup) {
        loadingText = 'Gegevens (leden in groep) aan het laden...';
    } else if (contactsInGroup.length === 0) {
        loadingText = 'Geen contact in groep gevonden!';
        loading = false;
    } else {
        loading = false;
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <span>Totaal leden in groep: {loading ? 'bezig...' : <strong>{meta.total}</strong>}</span>
                </div>
            </div>

            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <ContactsInGroupListHead
                            isUsedInLaposta={contactGroupDetails.isUsedInLaposta}
                            handleChangeSort={handleChangeSort}
                        />
                        <ContactsInGroupListFilter
                            filter={filter}
                            handleChangeFilter={handleChangeFilter}
                            isUsedInLaposta={contactGroupDetails.isUsedInLaposta}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={10}>{loadingText}</td>
                            </tr>
                        ) : (
                            contactsInGroup.map(contactInGroup => {
                                return (
                                    <ContactsInGroupListItem
                                        key={contactInGroup.id}
                                        {...contactInGroup}
                                        showDeleteItemModal={showDeleteItemModal}
                                        showEditItemModal={showEditItemModal}
                                        groupId={groupId}
                                        isUsedInLaposta={contactGroupDetails.isUsedInLaposta}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
            </form>
            <div className="col-md-6 col-md-offset-3">
                <DataTablePagination
                    onPageChangeAction={handlePageClick}
                    totalRecords={meta.total}
                    recordsPerPage={recordsPerPage}
                />
            </div>
            {showDeleteItem && (
                <ContactsInGroupDeleteItem
                    closeDeleteItemModal={closeDeleteItemModal}
                    groupId={groupId}
                    {...deleteItem}
                />
            )}
            {showEditItem && (
                <ContactsInGroupEditItem
                    closeEditItemModal={closeEditItemModal}
                    groupId={groupId}
                    {...editItem}
                    refreshContactsInGroupData={refreshContactsInGroupData}
                />
            )}
        </div>
    );
}

export default ContactsInGroupList;
