import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactsToImportList from './ContactsToImportList';
import ContactsToImportListToolbar from './ContactsToImportListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import ContactsToImportAPI from '../../../api/contacts-to-import/ContactsToImportAPI';
import filterHelper from '../../../helpers/FilterHelper';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';

const recordsPerPage = 50;

function ContactsToImportListApp() {
    const [ContactsToImport, setContactsToImport] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'lastName', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchContactsToImport();
        },
        [pagination.offset, sort]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchContactsToImport();
            }
        },
        [pressedEnter]
    );

    function fetchContactsToImport() {
        axios
            .all([ContactsToImportAPI.fetchContactsToImport(formatFilterHelper(), sort, pagination)])
            .then(
                axios.spread(payloadContactsToImport => {
                    setContactsToImport(payloadContactsToImport.data.data);
                    setMetaData(payloadContactsToImport.data.meta);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function onSubmitFilter() {
        setContactsToImport([]);

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
        // if (filter.tableName) {
        //     filters.push({ field: 'tableName', data: filter.tableName });
        // }
        //
        // if (filter.fieldName) {
        //     filters.push({ field: 'fieldName', data: filter.fieldName });
        // }
        //
        // if (filter.fieldFormatName) {
        //     filters.push({ field: 'fieldFormatName', data: filter.fieldFormatName });
        // }
        return filters;
    }

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
            console.log('handleKeyUp');
        }
    }

    function getCSV() {
        setLoading(true);
        // const { extraFilters, filterType, dataControleType } = this.state;
        // const filters = filterHelper(this.props.contactsFilters);
        // const sorts = this.props.contactsSorts;
        let filters = [];
        let extraFilters = [];
        let sorts = '';
        let filterType = '';
        let dataControleType = '';

        ContactsAPI.getCSVFromEnergySupplier({ filters, extraFilters, sorts, filterType, dataControleType })
            .then(payload => {
                fileDownload(
                    payload.data,
                    `signaleringslijst-importeren-energieklanten-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`
                );
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <ContactsToImportListToolbar
                        ContactsToImportTotal={meta.total}
                        refreshContactsToImport={fetchContactsToImport}
                        getCSV={getCSV}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <ContactsToImportList
                        ContactsToImport={ContactsToImport}
                        ContactsToImportTotal={meta.total}
                        recordsPerPage={recordsPerPage}
                        isLoading={isLoading}
                        filter={filter}
                        handlePageClick={handlePageClick}
                        handleChangeSort={handleChangeSort}
                        handleChangeFilter={handleChangeFilter}
                        handleKeyUp={handleKeyUp}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ContactsToImportListApp;
