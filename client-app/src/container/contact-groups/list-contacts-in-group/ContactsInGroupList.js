import React, { Component, useEffect, useState } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ContactsInGroupListHead from './ContactsInGroupListHead';
import ContactsInGroupListItem from './ContactsInGroupListItem';
import ContactsInGroupDeleteItem from './ContactsInGroupDeleteItem';
import ContactsInGroupEditItem from './ContactsInGroupEditItem';
import { connect } from 'react-redux';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import { fetchContactGroupDetails } from '../../../actions/contact-group/ContactGroupDetailsActions';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';

const recordsPerPage = 20;

function ContactsInGroupList(
    groupId,
    total,
    contactsInGroup,
    showCheckboxList,
    refreshContactsInGroupData
    // contactGroupDetails,
    // hasError,
    // isLoading,
) {
    const [contactGroupDetails, setContactGroupDetails] = useState([]);
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
    const [hasError, setHasError] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchContactGroupDetails();
            console.log('test useEffect - group: ' + groupId);
            console.log('contactsInGroup');
            console.log(contactsInGroup ? contactsInGroup : 'nog niet aanwezig');
            console.log(contactGroupDetails);
        },
        [
            pagination.offset,
            // sort,
            // filter.contact,
            // filter.emailedTo,
        ]
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
        setLoading(true);
        setContactGroupDetails([]);

        axios
            .all([
                ContactGroupAPI.fetchContactGroupDetails(
                    // formatFilterHelper(),
                    // sort,
                    // pagination,
                    groupId
                ),
            ])
            .then(
                axios.spread(payloadContactGroupDetails => {
                    console.log('payloadContactGroupDetails');
                    console.log(payloadContactGroupDetails);
                    setContactGroupDetails(payloadContactGroupDetails.data.data);
                    setMetaData(payloadContactGroupDetails.data.meta);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
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

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function handlePageClick(page) {
        let offset = Math.ceil(page.selected * recordsPerPage);

        setPagination({ ...pagination, offset });
    }

    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van contact in groep.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (!contactsInGroup) {
        loadingText = 'Gegevens aan het laden....';
    } else if (contactsInGroup.length === 0) {
        loadingText = 'Geen contact in groep gevonden!';
    } else {
        loading = false;
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <span>
                        Totaal leden in groep: {loading ? 'bezig...' : <strong>{contactsInGroup.length}</strong>}
                    </span>
                </div>
            </div>

            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <ContactsInGroupListHead
                            showCheckbox={showCheckboxList}
                            refreshContactsInGroupData={refreshContactsInGroupData}
                            isUsedInLaposta={contactGroupDetails.isUsedInLaposta}
                        />
                        {/*<ContactsInGroupListFilter*/}
                        {/*    showCheckbox={showCheckboxList}*/}
                        {/*    selectAllCheckboxes={() => selectAllCheckboxes()}*/}
                        {/*    onSubmitFilter={onSubmitFilter}*/}
                        {/*/>*/}
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
                <DataTablePagination onPageChangeAction={handlePageClick} totalRecords={total} recordsPerPage={10} />
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

// const mapStateToProps = state => {
//     return {
// isLoading: state.loadingData.isLoading,
// hasError: state.loadingData.hasError,
// contactGroupDetails: state.contactGroupDetails,
//     };
// };

// export default connect(mapStateToProps)(ContactsInGroupList);
export default ContactsInGroupList;
