import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactToImportsList from './ContactToImportsList';
import ContactToImportsListToolbar from './ContactToImportsListToolbar';
import axios from 'axios';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';

const recordsPerPage = 20;

function ContactToImportsListApp() {
    const [ContactToImports, setContactToImports] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [totalImportIds, setTotalImportIds] = useState([]);
    const [allowUpdateAction, setAllowUpdateAction] = useState(false);
    const [totalContactIds, setTotalContactIds] = useState([]);
    const [filter, setFilter] = useState([]);
    const [checkedAllNew, setCheckedAllNew] = useState(false);
    const [selectedImportsNew, setSelectedImportsNew] = useState([]);
    const [checkedAllUpdate, setCheckedAllUpdate] = useState(false);
    const [selectedContactsUpdate, setSelectedContactsUpdate] = useState([]);
    const [selectAllNew, setSelectAllNew] = useState(false);
    const [selectAllUpdate, setSelectAllUpdate] = useState(false);
    const [sorts, setSorts] = useState([{ field: 'lastName', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ page: 0, offset: 0, limit: recordsPerPage });

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            // console.log('use effect pagination.offset, sorts, selectAllNew === true, selectAllUpdate === true');
            fetchContactToImports();
        },
        [pagination.offset, filter, sorts, selectAllNew === true, selectAllUpdate === true]
    );

    // useEffect hook to monitor changes in selectedImportsNew
    useEffect(() => {
        // console.log('use effect selectedImportsNew');
        checkAllImportsNewAreChecked();
    }, [selectedImportsNew]); // Runs every time selectedImportsNew changes

    // useEffect hook to monitor changes in selectedContactsUpdate
    useEffect(() => {
        // console.log('use effect selectedContactsUpdate');
        checkAllContactsUpdateAreChecked();
    }, [selectedContactsUpdate]); // Runs every time selectedContactsUpdate changes

    // If pressed enter then reload data
    // useEffect(
    //     function() {
    //         console.log('use effect 2');
    //         if (pressedEnter) {
    //             console.log('pressedEnter');
    //             fetchContactToImports();
    //         }
    //     },
    //     [pressedEnter]
    // );

    function actionSelectAllNew() {
        setSelectedImportsNew([]);
        setPagination({ ...pagination, offset: 0 });

        if (selectAllNew === false) {
            setSelectAllUpdate(false);
            setSelectAllNew(true);
        } else {
            setSelectAllUpdate(false);
            setSelectAllNew(false);
        }
    }

    function actionSelectAllUpdate() {
        setSelectedContactsUpdate([]);
        setPagination({ ...pagination, offset: 0 });
        if (selectAllUpdate === false) {
            setSelectAllNew(false);
            setSelectAllUpdate(true);
        } else {
            setSelectAllNew(false);
            setSelectAllUpdate(false);
        }
    }

    function fetchContactToImports() {
        axios
            .all([
                ContactToImportsAPI.fetchContactToImports(
                    formatFilterHelper(),
                    sorts,
                    pagination,
                    selectAllNew,
                    selectAllUpdate
                ),
            ])
            .then(
                axios.spread(payloadContactToImports => {
                    setContactToImports(payloadContactToImports.data.data);
                    setTotalCount(payloadContactToImports.data.meta.total);
                    setTotalImportIds(payloadContactToImports.data.meta.totalImportIds);
                    setAllowUpdateAction(payloadContactToImports.data.meta.allowUpdateAction);
                    setTotalContactIds(payloadContactToImports.data.meta.totalContactIds);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function onSubmitFilter() {
        setContactToImports([]);

        // let page = 0;
        // let offset = 0;
        // setPagination({ ...pagination, page, offset });
        setPagination({ ...pagination, offset: 0 });
    }

    function handlePageClick(page) {
        let offset = Math.ceil(page.selected * recordsPerPage);

        setPagination({ ...pagination, offset });
    }

    function handleChangeSort(column, value) {
        let originalSorts = sorts;
        if (originalSorts.length === 3) originalSorts.pop();

        let sortItem = { field: `${column}`, order: `${value}` };
        setSorts([sortItem, ...originalSorts]);
    }

    function handleChangeFilter(column, value) {
        setFilter({ ...filter, [column]: value });
        onSubmitFilter();
    }

    function toggleAllCheckboxesNew() {
        if (checkedAllNew === false) {
            setCheckedAllNew(true);
            setSelectedImportsNew(totalImportIds);
        } else {
            setCheckedAllNew(false);
            setSelectedImportsNew([]);
        }
    }
    function toggleAllCheckboxesUpdate() {
        if (checkedAllUpdate === false) {
            setCheckedAllUpdate(true);
            setSelectedContactsUpdate(totalContactIds);
        } else {
            setCheckedAllUpdate(false);
            setSelectedContactsUpdate([]);
        }
    }

    function toggleCheckedImportNew(importId) {
        const importNewItem = { importId };

        // const isChecked = selectedImportsNew.includes(importId);
        const isChecked = selectedImportsNew.some(item => item.importId === importId);

        if (isChecked) {
            // Remove the importId from the array
            setSelectedImportsNew(selectedImportsNew.filter(item => !(item.importId === importId)));
            deBlockSelectContactsUpdate(importId, 'all');
        } else {
            // Add the importId to the array
            setSelectedImportsNew([...selectedImportsNew, importNewItem]);
            blockSelectContactsUpdate(importId, 'all');
        }
    }
    function toggleCheckedContactUpdate(importId, contactId) {
        // Create an object representing the current selection
        const contactUpdateItem = { importId, contactId };

        // Check if this pair is already in the selectedContactsUpdate array
        const isChecked = selectedContactsUpdate.some(
            item => item.importId === importId && item.contactId === contactId
        );

        if (isChecked) {
            // If the pair is already selected, remove it
            setSelectedContactsUpdate(
                selectedContactsUpdate.filter(item => !(item.importId === importId && item.contactId === contactId))
            );
            // Update the totalImportIds array to deblock new with same importId
            deBlockSelectImportNew(importId);
            // Update the totalContactIds array to deblock other contacts with the same importId
            deBlockSelectContactsUpdate(importId, contactId);
        } else {
            // If the pair is not selected, add it
            setSelectedContactsUpdate([...selectedContactsUpdate, contactUpdateItem]);
            // Update the totalImportIds array to block new with same importId
            blockSelectImportNew(importId);
            // Update the totalContactIds array to block other contacts with the same importId
            blockSelectContactsUpdate(importId, contactId);
        }
    }
    function checkAllImportsNewAreChecked() {
        if (selectAllNew) {
            setCheckedAllNew(selectedImportsNew.length === totalImportIds.length);
        }
    }
    function checkAllContactsUpdateAreChecked() {
        if (selectAllUpdate) {
            setCheckedAllUpdate(selectedContactsUpdate.length === totalContactIds.length);
        }
    }

    function blockSelectImportNew(importId) {
        // Update the totalImportIds array to block for same importId
        setTotalImportIds(
            totalImportIds.map(item => {
                if (item.importId === importId) {
                    return {
                        ...item,
                        blocked: true,
                    };
                }
                return item;
            })
        );
    }
    function blockSelectContactsUpdate(importId, contactId) {
        // Update the totalContactIds array to block other contacts with the same importId
        setTotalContactIds(
            totalContactIds.map(item => {
                if (item.importId === importId) {
                    return {
                        ...item,
                        blocked: item.contactId !== contactId,
                    };
                }
                return item;
            })
        );
    }
    function deBlockSelectImportNew(importId) {
        // Update the totalImportIds array to deblock for same importId
        setTotalImportIds(
            totalImportIds.map(item => {
                if (item.importId === importId) {
                    return {
                        ...item,
                        blocked: false,
                    };
                }
                return item;
            })
        );
    }
    function deBlockSelectContactsUpdate(importId, contactId) {
        // Update the totalContactIds array to deblock other contacts with the same importId
        setTotalContactIds(
            totalContactIds.map(item => {
                if (item.importId === importId) {
                    return {
                        ...item,
                        blocked: false,
                    };
                }
                return item;
            })
        );
    }

    function formatFilterHelper() {
        let filters = [];

        filters.push({ field: 'status', data: 'new' });

        if (filter.firstName) {
            filters.push({ field: 'firstName', data: filter.firstName });
        }
        if (filter.lastName) {
            filters.push({ field: 'lastName', data: filter.lastName });
        }
        if (filter.street) {
            filters.push({ field: 'street', data: filter.street });
        }
        if (filter.postalCode) {
            filters.push({ field: 'postalCode', data: filter.postalCode });
        }
        if (filter.city) {
            filters.push({ field: 'city', data: filter.city });
        }
        if (filter.emailContact) {
            filters.push({ field: 'emailContact', data: filter.emailContact });
        }
        return filters;
    }

    const numberSelectedNewTotal = () => {
        let numberSelectedNewTotal = 0;

        if (selectedImportsNew && totalImportIds) {
            numberSelectedNewTotal = selectedImportsNew.length + '/' + totalImportIds.length;
        } else {
            numberSelectedNewTotal = selectedImportsNew.length;
        }
        return numberSelectedNewTotal;
    };
    const numberSelectedUpdateTotal = () => {
        let numberSelectedUpdateTotal = 0;

        if (selectedContactsUpdate && totalContactIds) {
            numberSelectedUpdateTotal = selectedContactsUpdate.length + '/' + totalContactIds.length;
        } else {
            numberSelectedUpdateTotal = selectedContactsUpdate.length;
        }

        return numberSelectedUpdateTotal;
    };

    function getExcel() {
        setLoading(true);

        const filters = formatFilterHelper();

        ContactsAPI.getExcelContactToImport({ filters, sorts })
            .then(payload => {
                fileDownload(
                    payload.data,
                    `signaleringslijst-importeren-energieklanten-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`
                );
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function createContactsFromImport() {
        ContactToImportsAPI.createContactsFromImport(selectedImportsNew)
            .then(payload => {
                setTimeout(() => {
                    setSelectAllNew(false);
                    setSelectAllUpdate(false);
                    setCheckedAllNew(false);
                    setSelectedImportsNew([]);
                    setCheckedAllUpdate(false);
                    setSelectedContactsUpdate([]);
                    fetchContactToImports();
                }, 200);
            })
            .catch(() => {
                setLoading(false);
                alert('Er is iets misgegaan met aanmaken contacten vanuit import.');
            });
    }
    function updateContactsFromImport() {
        ContactToImportsAPI.updateContactsFromImport(selectedContactsUpdate)
            .then(payload => {
                setTimeout(() => {
                    setSelectAllNew(false);
                    setSelectAllUpdate(false);
                    setCheckedAllNew(false);
                    setSelectedImportsNew([]);
                    setCheckedAllUpdate(false);
                    setSelectedContactsUpdate([]);
                    fetchContactToImports();
                }, 200);
            })
            .catch(() => {
                setLoading(false);
                alert('Er is iets misgegaan met bijwerken contacten vanuit import.');
            });
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <ContactToImportsListToolbar
                        ContactToImportsTotal={totalCount}
                        refreshContactToImports={fetchContactToImports}
                        getExcel={getExcel}
                        allowUpdateAction={allowUpdateAction}
                        selectAllNew={selectAllNew}
                        selectAllUpdate={selectAllUpdate}
                        actionSelectAllNew={actionSelectAllNew}
                        actionSelectAllUpdate={actionSelectAllUpdate}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <ContactToImportsList
                        ContactToImports={ContactToImports}
                        ContactToImportsTotal={totalCount}
                        checkedAllNew={checkedAllNew}
                        checkedAllUpdate={checkedAllUpdate}
                        recordsPerPage={recordsPerPage}
                        isLoading={isLoading}
                        filter={filter}
                        handlePageClick={handlePageClick}
                        handleChangeSort={handleChangeSort}
                        handleChangeFilter={handleChangeFilter}
                        totalImportIds={totalImportIds}
                        allowUpdateAction={allowUpdateAction}
                        totalContactIds={totalContactIds}
                        selectAllNew={selectAllNew}
                        toggleCheckedImportNew={toggleCheckedImportNew}
                        toggleAllCheckboxesNew={toggleAllCheckboxesNew}
                        selectedImportsNew={selectedImportsNew}
                        numberSelectedNewTotal={numberSelectedNewTotal()}
                        selectAllUpdate={selectAllUpdate}
                        toggleCheckedContactUpdate={toggleCheckedContactUpdate}
                        toggleAllCheckboxesUpdate={toggleAllCheckboxesUpdate}
                        selectedContactsUpdate={selectedContactsUpdate}
                        numberSelectedUpdateTotal={numberSelectedUpdateTotal()}
                        createContactsFromImport={createContactsFromImport}
                        updateContactsFromImport={updateContactsFromImport}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ContactToImportsListApp;
