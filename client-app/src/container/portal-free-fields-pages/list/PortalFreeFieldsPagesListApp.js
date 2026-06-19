import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalFreeFieldsPagesList from './PortalFreeFieldsPagesList';
import PortalFreeFieldsPagesListToolbar from './PortalFreeFieldsPagesListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import ErrorModal from '../../../components/modal/ErrorModal';

const recordsPerPage = 50;

function PortalFreeFieldsPagesListApp() {
    const [portalFreeFieldsPages, setPortalFreeFieldsPages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'name', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState('');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchPortalFreeFieldsPages();
        },
        [pagination.offset, sort, filter.name, filter.isActive]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchPortalFreeFieldsPages();
            }
        },
        [pressedEnter]
    );

    function fetchPortalFreeFieldsPages() {
        setLoading(true);
        axios
            .all([PortalFreeFieldsAPI.fetchPortalFreeFieldsPages(formatFilterHelper(), sort, pagination)])
            .then(
                axios.spread(payloadPortalFreeFieldsPages => {
                    setPortalFreeFieldsPages(payloadPortalFreeFieldsPages.data.data);
                    setMetaData(payloadPortalFreeFieldsPages.data.meta);
                })
            )
            .catch(error => {
                // alert('Er is iets misgegaan met ophalen van de gegevens.');
                setShowErrorModal(true);
                setModalErrorMessage('Er is iets misgegaan met ophalen van de gegevens.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function deletePortalFreeFieldsPage(portalFreeFieldsPage) {
        setLoading(true);
        PortalFreeFieldsAPI.deletePortalFreeFieldsPage(portalFreeFieldsPage)
            .then(payload => {
                fetchPortalFreeFieldsPages();
            })
            .catch(error => {
                setShowErrorModal(true);
                setModalErrorMessage('Er is iets misgegaan bij verwijderen. Probeer het opnieuw.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    async function getExcelLogMutations() {
        setLoading(true);
        try {
            const res = await PortalFreeFieldsAPI.getExcelFreeFieldsFieldLog();
            fileDownload(res.data, `vrije-velden-mutaties-log-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`);
        } catch (error) {
            let errorMessage = 'Er is iets misgegaan bij downloaden. Probeer het opnieuw.';

            if (error?.response) {
                const { status, statusText, data } = error.response;

                if (data instanceof Blob) {
                    try {
                        const text = await data.text(); // Blob → string
                        try {
                            const json = JSON.parse(text); // probeer JSON
                            errorMessage = json?.message ?? text ?? errorMessage;
                        } catch {
                            errorMessage = text || errorMessage; // plain text fallback
                        }
                    } catch {
                        // niks, val terug op default
                    }
                } else {
                    errorMessage = data?.message || statusText || errorMessage;
                }
            }
            setShowErrorModal(true);
            setModalErrorMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    function onSubmitFilter() {
        setPortalFreeFieldsPages([]);

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
        if (filter.name) {
            filters.push({ field: 'name', data: filter.name });
        }
        if (filter.isActive) {
            filters.push({ field: 'isActive', data: filter.isActive });
        }

        return filters;
    }

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function closeErrorModal() {
        setShowErrorModal(false);
        setModalErrorMessage('');
    }

    return (
        <>
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <PortalFreeFieldsPagesListToolbar
                            portalFreeFieldsPagesTotal={meta.total}
                            refreshPortalFreeFieldsPages={fetchPortalFreeFieldsPages}
                            getExcelLogMutations={getExcelLogMutations}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        <PortalFreeFieldsPagesList
                            portalFreeFieldsPages={portalFreeFieldsPages}
                            portalFreeFieldsTotal={meta.total}
                            recordsPerPage={recordsPerPage}
                            isLoading={isLoading}
                            filter={filter}
                            handlePageClick={handlePageClick}
                            handleChangeSort={handleChangeSort}
                            handleChangeFilter={handleChangeFilter}
                            handleKeyUp={handleKeyUp}
                            deletePortalFreeFieldsPage={deletePortalFreeFieldsPage}
                        />
                    </div>
                </PanelBody>
            </Panel>
            {showErrorModal && (
                <ErrorModal closeModal={closeErrorModal} title={'Foutmelding'} errorMessage={modalErrorMessage} />
            )}
        </>
    );
}

export default PortalFreeFieldsPagesListApp;
