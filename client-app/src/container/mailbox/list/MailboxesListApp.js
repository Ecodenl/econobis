import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import MailboxesList from './MailboxesList';
import MailboxesListToolbar from './MailboxesListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';

const recordsPerPage = 25;

function MailboxesListApp() {
    const [mailboxes, setMailboxes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState({ name: '', isActive: 1 });
    const [sort, setSort] = useState([{ field: 'name', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchMailboxes();
        },
        [pagination.offset, sort, filter.name, filter.isActive]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchMailboxes();
            }
        },
        [pressedEnter]
    );

    function fetchMailboxes() {
        setLoading(true);
        axios
            .all([MailboxAPI.fetchMailboxes(formatFilterHelper(), sort, pagination)])
            .then(
                axios.spread(mailboxes => {
                    setMailboxes(mailboxes.data.data);
                    setMetaData(mailboxes.data.meta);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function onSubmitFilter() {
        setMailboxes([]);

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

    return (
        <Panel className="col-md-12">
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <MailboxesListToolbar mailboxesTotal={meta.total} refreshMailboxes={fetchMailboxes} />
                </div>

                <div className="col-md-12 margin-10-top">
                    <MailboxesList
                        mailboxes={mailboxes}
                        mailboxesTotal={meta.total}
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

export default MailboxesListApp;
