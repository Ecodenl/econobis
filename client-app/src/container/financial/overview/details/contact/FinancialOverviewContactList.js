import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import FinancialOverviewContactItem from './FinancialOverviewContactItem';
import FinancialOverviewContactAPI from '../../../../../api/financial/overview/FinancialOverviewContactAPI';
import useKeyPress from '../../../../../helpers/useKeyPress';
import DataTablePagination from '../../../../../components/dataTable/DataTablePagination';
import DataTable from '../../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../../components/dataTable/DataTableHead';
import DataTableHeadTitleAndSort from '../../../../../components/dataTable/DataTableHeadTitleAndSort';
import DataTableBody from '../../../../../components/dataTable/DataTableBody';
import FinancialOverviewContactListFilter from './FinancialOverviewContactFilter';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ButtonIcon from '../../../../../components/button/ButtonIcon';
import ButtonText from '../../../../../components/button/ButtonText';
import { connect } from 'react-redux';
import { previewFinancialOverview } from '../../../../../actions/financial-overview/FinancialOverviewActions';
import FinancialOverviewCreateInterimModal from '../../create/FinancialOverviewCreateInterimModal';

const recordsPerPage = 50;
// const maxRecordsPost = 50;

function FinancialOverviewContactList({ financialOverview, previewFinancialOverview }) {
    const navigate = useNavigate();

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
    const [totalsInfo, setTotalsInfo] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'contact', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    const [showInterimModal, setShowInterimModal] = useState(false);
    const [selectedFOContactId, setSelectedFOContactId] = useState(null);

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFinancialOverviewContacts();
        },
        [
            pagination.offset,
            sort,
            filter.contact,
            filter.statusId,
            filter.dateSent,
            filter.emailedTo,
            onlyEmailFinancialOverviewContacts,
            onlyPostFinancialOverviewContacts,
            financialOverview.totalFinancialOverviewProjectsConcept,
            financialOverview.totalFinancialOverviewProjectsDefinitive,
            financialOverview.statusId,
        ]
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
        setFinancialOverviewContacts([]);

        axios
            .all([
                FinancialOverviewContactAPI.fetchFinancialOverviewContacts(
                    formatFilterHelper(),
                    sort,
                    pagination,
                    financialOverview.id,
                    onlyEmailFinancialOverviewContacts,
                    onlyPostFinancialOverviewContacts
                ),
                FinancialOverviewDetailsAPI.fetchTotalsInfoFinancialOverview(financialOverview),
            ])
            .then(
                axios.spread((payloadFinancialOverviewContacts, payloadTotalsInfoFinancialOverview) => {
                    setFinancialOverviewContacts(payloadFinancialOverviewContacts.data.data);
                    setMetaData(payloadFinancialOverviewContacts.data.meta);
                    setTotalsInfo(payloadTotalsInfoFinancialOverview.data);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function previewSendEmail() {
        setEmailFinancialOverviewContactsText('Preview e-mail waardestaten');
        setOnlyEmailFinancialOverviewContacts(true);

        if (financialOverviewContactIds.length > 0) {
            previewFinancialOverview(financialOverviewContactIds);
            navigate(`/waardestaat/${financialOverview.id}/aanmaken/email`);
        } else {
            toggleShowCheckboxList();
        }
    }

    function previewSendPost() {
        setPostFinancialOverviewContactsText('Preview post waardestaten');
        setOnlyPostFinancialOverviewContacts(true);

        // Bij verzenden post voorlopig even max 50 tegelijk (worden in 1 PDF samengevoegd en anders wordt PDF wel erg groot)
        // if (financialOverviewContactIds.length > maxRecordsPost) {
        //     toggleErrorMessagePost();
        // } else {
        if (financialOverviewContactIds.length > 0) {
            previewFinancialOverview(financialOverviewContactIds);
            navigate(`/waardestaat/${financialOverview.id}/aanmaken/post`);
        } else {
            toggleShowCheckboxList();
        }
        // }
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

    function refreshFinancialOverviewContacts() {
        setFilter([]);

        fetchFinancialOverviewContacts();

        setShowSelectFinancialOverviewContactsToSend(false);
        setCheckedAll(false);
        setFinancialOverviewContactIds([]);
        setOnlyEmailFinancialOverviewContacts(false);
        setOnlyPostFinancialOverviewContacts(false);
        setShowErrorMessagePost(false);
        setEmailFinancialOverviewContactsText('Selecteer preview e-mail waardestaten');
        setPostFinancialOverviewContactsText('Selecteer preview post waardestaten');
    }

    function onSubmitFilter() {
        // this.props.clearFinancialOverviewContact();
        setFinancialOverviewContacts([]);

        // this.props.setFinancialOverviewContactPagination({ page: 0, offset: 0 });
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

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function toggleCheckedAll() {
        const isChecked = event.target.checked;
        let financialOverviewContactIds = [];

        if (isChecked) {
            financialOverviewContactIds = meta.financialOverviewContactIdsTotal;
        }
        // if (onlyPostFinancialOverviewContacts) {
        //     setFinancialOverviewContactIds(financialOverviewContactIds.slice(0, maxRecordsPost));
        // } else {
        setFinancialOverviewContactIds(financialOverviewContactIds);
        // }
        setCheckedAll(isChecked);
    }

    function toggleFinancialOverviewContactCheck(event) {
        const isChecked = event.target.checked;
        const financialOverviewContactId = Number(event.target.name);

        if (isChecked) {
            setFinancialOverviewContactIds([...financialOverviewContactIds, financialOverviewContactId]);
            checkAllFinancialOverviewContactsAreChecked();
        } else {
            setFinancialOverviewContactIds([
                ...financialOverviewContactIds.filter(item => item !== financialOverviewContactId),
            ]);
            setCheckedAll(false);
        }
    }

    function checkAllFinancialOverviewContactsAreChecked() {
        setCheckedAll(financialOverviewContactIds.length === meta.financialOverviewContactIdsTotal.length);
    }

    function createInterim(financialOverviewContactId) {
        setSelectedFOContactId(financialOverviewContactId);
        setShowInterimModal(true);
    }

    let messageText = null;
    if (totalsInfo.totalFinancialOverviewContactsErrorSending > 0) {
        messageText =
            'Een fout verzonden waardestaat is definitief aangemaakt in Econobis, maar kon niet worden verzonden. Dit omdat het contact een fout e-mailadres heeft of omdat de mailbox niet werkte. Corrigeer het e-mailadres of zorg er voor dat de mail box weer werkt. Vervolgens kan je met bovenstaande knoppen de waardestaat opnieuw verzenden. Omdat de waardestaat definitief is kan je deze niet verwijderen.';
    }

    let numberSelectedNumberTotal = 0;

    if (financialOverviewContactIds) {
        if (meta && meta.financialOverviewContactIdsTotal) {
            numberSelectedNumberTotal =
                financialOverviewContactIds.length + '/' + meta.financialOverviewContactIdsTotal.length;
        } else {
            numberSelectedNumberTotal = financialOverviewContactIds.length;
        }
    }

    let totalFinancialOverviewContactsInProgress = 0;
    let totalFinancialOverviewContactsIsSending = 0;
    let totalFinancialOverviewContactsIsResending = 0;
    let totalFinancialOverviewContactsErrorMaking = 0;
    let totalInProgress = 0;
    let inProgressStartText = null;
    let inProgressEndText = null;
    let inProgressText = null;
    let isSendingText = null;
    let isResendingText = null;
    let errorMakingText = null;
    if (totalsInfo) {
        totalFinancialOverviewContactsInProgress = totalsInfo.totalFinancialOverviewContactsInProgress
            ? totalsInfo.totalFinancialOverviewContactsInProgress
            : 0;
        totalFinancialOverviewContactsIsSending = totalsInfo.totalFinancialOverviewContactsIsSending
            ? totalsInfo.totalFinancialOverviewContactsIsSending
            : 0;
        totalFinancialOverviewContactsIsResending = totalsInfo.totalFinancialOverviewContactsIsResending
            ? totalsInfo.totalFinancialOverviewContactsIsResending
            : 0;
        totalFinancialOverviewContactsErrorMaking = totalsInfo.totalFinancialOverviewContactsErrorMaking
            ? totalsInfo.totalFinancialOverviewContactsErrorMaking
            : 0;

        totalInProgress +=
            totalFinancialOverviewContactsErrorMaking +
            totalFinancialOverviewContactsInProgress +
            totalFinancialOverviewContactsIsResending +
            totalFinancialOverviewContactsIsSending;

        if (totalInProgress > 0) {
            inProgressStartText = 'Overzicht status bij het maken en verzenden waardestaten';
            if (totalFinancialOverviewContactsInProgress > 0) {
                inProgressText =
                    '- Concept waardestaten die nu definitief gemaakt worden: ' +
                    totalFinancialOverviewContactsInProgress;
            }
            if (totalFinancialOverviewContactsIsSending > 0) {
                isSendingText =
                    '- Definitieve waardestaten die nu verzonden (e-mail of PDF) worden: ' +
                    totalFinancialOverviewContactsIsSending;
            }
            if (totalFinancialOverviewContactsIsResending > 0) {
                isResendingText =
                    '- Definitieve waardestaten die nu opnieuw verzonden worden: ' +
                    totalFinancialOverviewContactsIsResending;
            }
            if (totalFinancialOverviewContactsErrorMaking > 0) {
                errorMakingText =
                    '- Definitieve waardestaten met status "Fout bij maken": ' +
                    totalFinancialOverviewContactsErrorMaking;
            }
            inProgressEndText =
                'Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om status overzicht te verversen.';
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshFinancialOverviewContacts} />
                        {financialOverview.definitive &&
                        financialOverview.statusId === 'definitive' &&
                        (totalsInfo.totalFinancialOverviewContactsToSend > 0 ||
                            totalsInfo.totalFinancialOverviewContactsErrorSending > 0) &&
                        !onlyPostFinancialOverviewContacts &&
                        meta.total > 0 ? (
                            <ButtonText
                                buttonText={emailFinancialOverviewContactsText}
                                onClickAction={() => previewSendEmail()}
                            />
                        ) : null}
                        {financialOverview.definitive &&
                        financialOverview.statusId === 'definitive' &&
                        (totalsInfo.totalFinancialOverviewContactsToSend > 0 ||
                            totalsInfo.totalFinancialOverviewContactsErrorSending > 0) &&
                        !onlyEmailFinancialOverviewContacts &&
                        meta.total > 0 ? (
                            <ButtonText
                                buttonText={postFinancialOverviewContactsText}
                                onClickAction={() => previewSendPost()}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="pull-right">Resultaten: {meta.total || 0}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                {messageText ? <div className="alert alert-danger">{messageText}</div> : null}
            </div>

            {!showSelectFinancialOverviewContactsToSend ? (
                <div className="col-md-12">
                    {inProgressStartText ? (
                        <div className="alert alert-warning">
                            {inProgressStartText}
                            <br />
                            {inProgressText ? (
                                <span>
                                    {inProgressText} <br />
                                </span>
                            ) : null}
                            {isSendingText ? (
                                <span>
                                    {isSendingText} <br />
                                </span>
                            ) : null}
                            {isResendingText ? (
                                <span>
                                    {isResendingText} <br />
                                </span>
                            ) : null}
                            {errorMakingText ? (
                                <span>
                                    {errorMakingText} <br />
                                </span>
                            ) : null}
                            <br /> {inProgressEndText}
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="col-md-12">
                    {numberSelectedNumberTotal ? (
                        <div className="alert alert-success">
                            Geselecteerde waardestaten: {numberSelectedNumberTotal}
                        </div>
                    ) : null}
                </div>
            )}
            <div className="col-md-12">
                {showErrorMessagePost ? (
                    <ErrorModal
                        closeModal={toggleErrorMessagePost}
                        title={'Te veel waardestaten geselecteerd'}
                        errorMessage={'Er kunnen maximaal 50 post waardestaten tegelijk aangemaakt worden.'}
                    />
                ) : null}
            </div>

            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            {showSelectFinancialOverviewContactsToSend && <th width="5%" />}
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
                            showSelectFinancialOverviewContactsToSend={showSelectFinancialOverviewContactsToSend}
                            toggleCheckedAll={toggleCheckedAll}
                            filter={filter}
                            handleChangeFilter={handleChangeFilter}
                        />
                    </DataTableHead>

                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={showSelectFinancialOverviewContactsToSend ? 6 : 5}>
                                    Bezig met gegevens laden
                                </td>
                            </tr>
                        ) : financialOverviewContacts.length > 0 ? (
                            financialOverviewContacts.map(financialOverviewContact => {
                                return (
                                    <FinancialOverviewContactItem
                                        key={financialOverviewContact.id}
                                        {...financialOverviewContact}
                                        onlyEmailFinancialOverviewContacts={onlyEmailFinancialOverviewContacts}
                                        onlyPostFinancialOverviewContacts={onlyPostFinancialOverviewContacts}
                                        showSelectFinancialOverviewContactsToSend={
                                            showSelectFinancialOverviewContactsToSend
                                        }
                                        toggleFinancialOverviewContactCheck={toggleFinancialOverviewContactCheck}
                                        financialOverviewContactIds={financialOverviewContactIds}
                                        createInterim={createInterim}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={showSelectFinancialOverviewContactsToSend ? 6 : 5}>Geen resultaten!</td>
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
            </form>

            {showInterimModal && (
                <FinancialOverviewCreateInterimModal
                    financialOverviewContactId={selectedFOContactId}
                    onClose={() => setShowInterimModal(false)}
                />
            )}
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    previewFinancialOverview: data => {
        dispatch(previewFinancialOverview(data));
    },
});

export default connect(null, mapDispatchToProps)(FinancialOverviewContactList);
