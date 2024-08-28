import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ContactToImportsList from './ContactToImportsList';
import ContactToImportsListToolbar from './ContactToImportsListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';
import filterHelper from '../../../helpers/FilterHelper';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';

const recordsPerPage = 3;

function ContactToImportsListApp() {
    const [ContactToImports, setContactToImports] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0, totalImportIds: 0, totalContactIds: 0 });
    const [filter, setFilter] = useState([]);
    const [checkedAllNew, setCheckedAllNew] = useState(false);
    const [selectedImportsNew, setSelectedImportsNew] = useState([]);
    const [checkedAllUpdate, setCheckedAllUpdate] = useState(false);
    const [selectedContactsUpdate, setSelectedContactsUpdate] = useState([]);
    const [selectAllNew, setSelectAllNew] = useState(false);
    const [selectAllUpdate, setSelectAllUpdate] = useState(false);
    const [sort, setSort] = useState([{ field: 'lastName', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            console.log('use effect 1');
            fetchContactToImports();
        },
        [pagination.offset, sort, selectAllNew === true, selectAllUpdate === true]
    );

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
        setSelectAllUpdate(false);
        setSelectAllNew(!selectAllNew);
    }

    function actionSelectAllUpdate() {
        setSelectAllNew(false);
        setSelectAllUpdate(!selectAllUpdate);
    }

    function fetchContactToImports() {
        axios
            .all([
                ContactToImportsAPI.fetchContactToImports(
                    formatFilterHelper(),
                    sort,
                    pagination,
                    selectAllNew,
                    selectAllUpdate
                ),
            ])
            .then(
                axios.spread(payloadContactToImports => {
                    setContactToImports(payloadContactToImports.data.data);
                    setMetaData(payloadContactToImports.data.meta);

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

    function selectAllCheckboxesNew() {
        if (checkedAllNew === false) {
            setCheckedAllNew(true);
            setSelectedImportsNew(meta.totalImportIds);
        } else {
            setCheckedAllNew(false);
            setSelectedImportsNew([]);
        }
    }

    // function toggleCheckedAllNew() {
    //     const isChecked = event.target.checked;
    //     let orderIds = [];
    //
    //     if (isChecked) {
    //         orderIds = this.props.orders.meta.orderIdsTotal;
    //     }
    //
    //     this.setState({
    //         orderIds: orderIds,
    //         checkedAll: isChecked,
    //     });
    // };
    //
    // function toggleOrderCheck(event) {
    //     const isChecked = event.target.checked;
    //     const orderId = Number(event.target.name);
    //
    //     if (isChecked) {
    //         this.setState(
    //             {
    //                 orderIds: [...this.state.orderIds, orderId],
    //             },
    //             this.checkAllOrdersAreChecked
    //         );
    //     } else {
    //         this.setState({
    //             orderIds: this.state.orderIds.filter(item => item !== orderId),
    //             checkedAll: false,
    //         });
    //     }
    // };
    //
    // function checkAllOrdersAreChecked() {
    //     this.setState({
    //         checkedAll: this.state.orderIds.length === this.props.orders.meta.orderIdsTotal.length,
    //     });
    // }

    function selectAllCheckboxesUpdate() {
        if (checkedAllUpdate === false) {
            setCheckedAllUpdate(true);
            setSelectedContactsUpdate(meta.totalContactIds);
        } else {
            setCheckedAllUpdate(false);
            setSelectedContactsUpdate([]);
        }
    }
    function setCheckedContactNew(importId) {
        console.log('setCheckedContactNew voor import Id: ' + importId);
    }

    function setCheckedContactUpdate(importId, personId) {
        console.log('setCheckedContactNew voor import Id: ' + importId + ' en personId ' + personId);
    }

    function formatFilterHelper() {
        let filters = [];

        filters.push({ field: 'status', data: 'new' });

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
                    <ContactToImportsListToolbar
                        ContactToImportsTotal={meta.total}
                        refreshContactToImports={fetchContactToImports}
                        getCSV={getCSV}
                        selectAllNew={selectAllNew}
                        selectAllUpdate={selectAllUpdate}
                        actionSelectAllNew={actionSelectAllNew}
                        actionSelectAllUpdate={actionSelectAllUpdate}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <ContactToImportsList
                        ContactToImports={ContactToImports}
                        ContactToImportsTotal={meta.total}
                        recordsPerPage={recordsPerPage}
                        isLoading={isLoading}
                        filter={filter}
                        handlePageClick={handlePageClick}
                        handleChangeSort={handleChangeSort}
                        handleChangeFilter={handleChangeFilter}
                        handleKeyUp={handleKeyUp}
                        refreshContactToImports={fetchContactToImports}
                        selectAllNew={selectAllNew}
                        setCheckedContactNew={setCheckedContactNew}
                        selectAllCheckboxesNew={selectAllCheckboxesNew}
                        selectedImportsNew={selectedImportsNew}
                        selectAllUpdate={selectAllUpdate}
                        setCheckedContactUpdate={setCheckedContactUpdate}
                        selectAllCheckboxesUpdate={selectAllCheckboxesUpdate}
                        selectedContactsUpdate={selectedContactsUpdate}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ContactToImportsListApp;
