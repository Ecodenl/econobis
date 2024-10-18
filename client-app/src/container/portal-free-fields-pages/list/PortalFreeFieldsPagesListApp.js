import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalFreeFieldsPagesList from './PortalFreeFieldsPagesList';
import PortalFreeFieldsPagesListToolbar from './PortalFreeFieldsPagesListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import PortalFreeFieldsAPI from '../../../api/portal-free-fields/PortalFreeFieldsPageAPI';

const recordsPerPage = 50;

function PortalFreeFieldsPagesListApp() {
    const [portalFreeFieldsPages, setPortalFreeFieldsPages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'name', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchPortalFreeFieldsPages();
        },
        [pagination.offset, sort, filter.name]
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
        axios
            .all([PortalFreeFieldsAPI.fetchPortalFreeFieldsPages(formatFilterHelper(), sort, pagination)])
            .then(
                axios.spread(payloadPortalFreeFieldsPages => {
                    setPortalFreeFieldsPages(payloadPortalFreeFieldsPages.data.data);
                    setMetaData(payloadPortalFreeFieldsPages.data.meta);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
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

        return filters;
    }

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
        }
    }

    function deletePortalFreeFieldsPage(portalFreeFieldsPage) {
        PortalFreeFieldsAPI.deletePortalFreeFieldsPage(portalFreeFieldsPage)
            .then(payload => {
                fetchPortalFreeFieldsPages();
            })
            .catch(error => {
                // setLoading(false);
                alert('Er is iets misgegaan bij verwijderen. Probeer het opnieuw.');
            });
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <PortalFreeFieldsPagesListToolbar
                        portalFreeFieldsPagesTotal={meta.total}
                        refreshPortalFreeFieldsPages={fetchPortalFreeFieldsPages}
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
    );
}

export default PortalFreeFieldsPagesListApp;
