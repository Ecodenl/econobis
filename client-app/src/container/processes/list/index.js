import React, { useEffect, useState } from 'react';
import ProcessesListItem from './Item';
import JobsLogAPI from '../../../api/jobs-log/JobsLogAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ProccessesListToolbar from './Toolbar';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import moment from 'moment';
import ProcessesListFilter from './Filter';
import useKeyPress from '../../../helpers/useKeyPress';

const initialFilter = { createdAt: moment().format('YYYY-MM-DD'), value: '', jobCategoryId: null };

function ProcessesListApp() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState(initialFilter);
    const [sort, setSort] = useState(['-createdAt', '-id']);
    const [pagination, setPagination] = useState({ offset: 0, limit: 20 });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchJobslogs();
        },
        [pagination.offset, sort, filter.createdAt, filter.jobCategoryId]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchJobslogs();
            }
        },
        [pressedEnter]
    );

    function fetchJobslogs() {
        setLoading(true);

        JobsLogAPI.fetchJobslogs(formatFilterHelper(), sort, pagination)
            .then(payload => {
                setJobs(payload.data.data);
                setMetaData(payload.data.meta);
                setLoading(false);
            })
            .catch(error => {
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function handlePageClick(page) {
        let offset = Math.ceil(page.selected * 20);

        setPagination({ ...pagination, offset });
    }

    function handleChangeSort(column, value) {
        let originalSort = sort;
        if (originalSort.length === 3) originalSort.pop();

        // Set new sort record in front of array. Max 3 items in array. Set last added 2 items in array which are 0 and 1
        if (value === 'DESC') {
            setSort([`-${column}`, ...originalSort]);
        } else {
            setSort([column, ...originalSort]);
        }
    }

    function handleChangeFilter(column, value) {
        setFilter({ ...filter, [column]: value });
    }

    function formatFilterHelper() {
        let formattedFilter = { and: [] };

        if (filter.createdAt) {
            formattedFilter.and.push({
                field: 'createdAt',
                operator: 'like',
                data: `${moment(filter.createdAt).format('YYYY-MM-DD')}%`,
            });
        }

        if (filter.value) {
            formattedFilter.and.push({ field: 'value', operator: 'like', data: `%${filter.value}%` });
        }

        if (filter.jobCategoryId) {
            formattedFilter.and.push({ field: 'jobCategoryId', data: filter.jobCategoryId });
        }

        return formattedFilter;
    }

    return (
        <Panel>
            <PanelBody>
                <ProccessesListToolbar countTotal={meta.total} reloadJobslogs={() => setFilter(initialFilter)} />
                <DataTable>
                    <DataTableHead>
                        <tr className="thead-title">
                            <DataTableHeadTitleAndSort
                                title={'Datum'}
                                width={'20%'}
                                setSorts={handleChangeSort}
                                sortColumn={'createdAt'}
                            />
                            <DataTableHeadTitleAndSort
                                title={'Categorie'}
                                width={'20%'}
                                setSorts={handleChangeSort}
                                sortColumn={'jobCategoryId'}
                            />
                            <DataTableHeadTitleAndSort
                                title={'Melding'}
                                width={'60%'}
                                setSorts={handleChangeSort}
                                sortColumn={'value'}
                            />
                        </tr>
                        <ProcessesListFilter filter={filter} handleChangeFilter={handleChangeFilter} />
                    </DataTableHead>

                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3}>Bezig met gegevens laden</td>
                            </tr>
                        ) : jobs.length > 0 ? (
                            jobs.map(job => {
                                return <ProcessesListItem key={job.id} {...job} />;
                            })
                        ) : (
                            <tr>
                                <td colSpan={3}>Geen resultaten!</td>
                            </tr>
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-6 col-md-offset-3">
                    <DataTablePagination
                        onPageChangeAction={handlePageClick}
                        totalRecords={meta.total}
                        initialPage={0}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default ProcessesListApp;
