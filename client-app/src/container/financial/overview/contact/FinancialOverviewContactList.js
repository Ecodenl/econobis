import React, { useEffect, useState } from 'react';
import FinancialOverviewContactItem from './FinancialOverviewContactItem';
import FinancialOverviewContactToolbar from './FinancialOverviewContactToolbar';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import { hashHistory } from 'react-router';
import useKeyPress from '../../../../helpers/useKeyPress';
import moment from 'moment';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableHeadTitleAndSort from '../../../../components/dataTable/DataTableHeadTitleAndSort';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import FinancialOverviewContactListFilter from './FinancialOverviewContactFilter';

const initialFilter = { contact: '', statusId: null, dateSent: '', emailedTo: '' };
const recordsPerPage = 50;

function FinancialOverviewContactList({ financialOverview }) {
    const [showSelectFinancialOverviewContactsToSend, setShowSelectFinancialOverviewContactsToSend] = useState(false);
    const [checkedAll, setCheckedAll] = useState(false);
    const [financialOverviewContactIds, setFinancialOverviewContactIds] = useState([]);
    const [onlyEmailFinancialOverviewContacts, setOnlyEmailFinancialOverviewContacts] = useState(false);
    const [onlyPostFinancialOverviewContacts, setOnlyPostFinancialOverviewContacts] = useState(false);
    const [showErrorMessagePost, setShowErrorMessagePost] = useState(false);
    const [emailFinancialOverviewContactsText, setEmailFinancialOverviewContactsText] = useState(
        'Selecteer preview e-mail waardestaten'
    );
    const [postFinancialOverviewContactsText, setPostFinancialOverviewContactsText] = useState(
        'Selecteer preview post waardestaten'
    );

    const [financialOverviewContacts, setFinancialOverviewContacts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'contact', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFinancialOverviewContacts();
        },
        [pagination.offset, sort, filter.contact, filter.statusId, filter.dateSent, filter.emailedTo]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchFinancialOverviewContacts();
            }
        },
        [pressedEnter]
    );

    function fetchFinancialOverviewContacts() {
        setLoading(true);

        FinancialOverviewContactAPI.fetchFinancialOverviewContacts(
            formatFilterHelper(),
            sort,
            pagination,
            financialOverview.id,
            onlyEmailFinancialOverviewContacts,
            onlyPostFinancialOverviewContacts
        )
            .then(payload => {
                setFinancialOverviewContacts(payload.data.data);
                setMetaData(payload.data.meta);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });

        // fetchTotalsInfoFinancialOverview(financialOverview.id);
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
    }

    function formatFilterHelper() {
        let filters = [];
        if (filter.contact) {
            filters.push({ field: 'contact', data: filter.contact });
        }

        if (filter.statusId) {
            filters.push({ field: 'statusId', data: filter.statusId });
        }

        if (filter.dateSent) {
            filters.push({
                field: 'dateSent',
                data: moment(filter.dateSent).format('YYYY-MM-DD'),
            });
        }

        if (filter.emailedTo) {
            filters.push({ field: 'emailedTo', data: filter.emailedTo });
        }
        return filters;
    }

    function previewSend() {
        setEmailFinancialOverviewContactsText('Preview e-mail waardestaten');
        setOnlyEmailFinancialOverviewContacts(true);

        fetchFinancialOverviewContacts();

        if (financialOverviewContactIds.length > 0) {
            previewSend(financialOverviewContactIds);
            hashHistory.push(`/waardestaat/${id}/aanmaken/email`);
        } else {
            toggleShowCheckboxList();
        }
    }

    function previewSendPost() {
        setPostFinancialOverviewContactsText('Preview e-mail waardestaten');
        setOnlyPostFinancialOverviewContacts(true);

        fetchFinancialOverviewContacts();

        // Bij verzenden post voorlopig even max 50 tegelijk (worden in 1 PDF samengevoegd en anders wordt PDF wel erg groot)
        if (financialOverviewContactIds.length > 50) {
            toggleErrorMessagePost();
        } else {
            if (financialOverviewContactIds.length > 0) {
                previewSend(financialOverviewContactIds);
                hashHistory.push(`/waardestaat/${id}/aanmaken/post`);
            } else {
                toggleShowCheckboxList();
            }
        }
    }

    function toggleErrorMessagePost() {
        setShowErrorMessagePost(!showErrorMessagePost);
    }

    function toggleShowCheckboxList() {
        if (showSelectFinancialOverviewContactsToSend) {
            setShowSelectFinancialOverviewContactsToSend(false);
            setFinancialOverviewContactIds([]);
        } else {
            setShowSelectFinancialOverviewContactsToSend(true);
            setFinancialOverviewContactIds([]);
        }
    }

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let financialOverviewContactIds = [];

        if (isChecked) {
            financialOverviewContactIds = meta.financialOverviewContactIdsTotal;
        }
        setFinancialOverviewContactIds(financialOverviewContactIds);
        setCheckedAll(isChecked);
    }

    function toggleFinancialOverviewContactCheck(event) {
        const isChecked = event.target.checked;
        const financialOverviewContactId = Number(event.target.name);

        if (isChecked) {
            setFinancialOverviewContactIds({ ...financialOverviewContactIds, financialOverviewContactId });
            checkAllFinancialOverviewContactsAreChecked();
        } else {
            setFinancialOverviewContactIds({
                ...financialOverviewContactIds.filter(item => item !== financialOverviewContactId),
            });
            setCheckedAll(false);
        }
    }

    function checkAllFinancialOverviewContactsAreChecked() {
        setCheckedAll(financialOverviewContactIds.length === meta.financialOverviewContactIdsTotal.length);
    }

    return (
        <Panel>
            <PanelBody>
                <FinancialOverviewContactToolbar
                    financialOverview={financialOverview}
                    countTotal={meta.total}
                    reloadFinancialOverviewContacts={() => {
                        setFilter(initialFilter);
                        fetchFinancialOverviewContacts();
                    }}
                />

                <div className="margin-10-top">
                    <DataTable>
                        <DataTableHead>
                            <tr className="thead-title">
                                <DataTableHeadTitleAndSort
                                    title={'Contact'}
                                    width={'30%'}
                                    setSorts={handleChangeSort}
                                    sortColumn={'contact'}
                                />
                                <DataTableHeadTitleAndSort
                                    title={'Status'}
                                    width={'15%'}
                                    setSorts={handleChangeSort}
                                    sortColumn={'statusId'}
                                />
                                <DataTableHeadTitleAndSort
                                    title={'Datum verzonden'}
                                    width={'15%'}
                                    setSorts={handleChangeSort}
                                    sortColumn={'dateSent'}
                                />
                                <DataTableHeadTitleAndSort
                                    title={'E-mail'}
                                    width={'30%'}
                                    setSorts={handleChangeSort}
                                    sortColumn={'emailedTo'}
                                />
                                <th width={'5%'} />
                            </tr>
                            <FinancialOverviewContactListFilter
                                filter={filter}
                                handleChangeFilter={handleChangeFilter}
                            />
                        </DataTableHead>

                        <DataTableBody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5}>Bezig met gegevens laden</td>
                                </tr>
                            ) : financialOverviewContacts.length > 0 ? (
                                financialOverviewContacts.map(financialOverviewContact => {
                                    return (
                                        <FinancialOverviewContactItem
                                            key={financialOverviewContact.id}
                                            {...financialOverviewContact}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>Geen resultaten!</td>
                                </tr>
                            )}
                        </DataTableBody>
                    </DataTable>

                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={handlePageClick}
                            totalRecords={meta.total}
                            initialPage={0}
                            recordsPerPage={recordsPerPage}
                        />
                    </div>
                </div>
            </PanelBody>
        </Panel>
    );
}

export default FinancialOverviewContactList;
