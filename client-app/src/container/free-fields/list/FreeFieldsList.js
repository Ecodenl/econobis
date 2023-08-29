import React, { useEffect, useState } from 'react';
import axios from 'axios';

import FreeFieldsListItem from './FreeFieldsListItem';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';
import useKeyPress from '../../../helpers/useKeyPress';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import FreeFieldsListHead from './FreeFieldsListHead';
import FreeFieldsListFilter from './FreeFieldsListFilter';
import ButtonIcon from '../../../components/button/ButtonIcon';

const recordsPerPage = 50;

function FreeFieldsList() {
    const [freeFieldsFields, setFreeFieldsFields] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [meta, setMetaData] = useState({ total: 0 });
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState([{ field: 'tableName', order: 'ASC' }]);
    const [pagination, setPagination] = useState({ offset: 0, limit: recordsPerPage });
    const pressedEnter = useKeyPress('Enter');

    // If pagination, sort or filter created at change then reload data
    useEffect(
        function() {
            fetchFreeFieldsFields();
        },
        [pagination.offset, sort, filter.tableName, filter.fieldName, filter.fieldFormatName]
    );

    // If pressed enter then reload data
    useEffect(
        function() {
            if (pressedEnter) {
                fetchFreeFieldsFields();
            }
        },
        [pressedEnter]
    );

    function fetchFreeFieldsFields() {
        setLoading(true);
        setFreeFieldsFields([]);

        axios
            .all([FreeFieldsAPI.fetchFreeFields(formatFilterHelper(), sort, pagination)])
            .then(
                axios.spread(payloadFreeFieldsFields => {
                    setFreeFieldsFields(payloadFreeFieldsFields.data.data);
                    setMetaData(payloadFreeFieldsFields.data.meta);

                    setLoading(false);
                })
            )
            .catch(error => {
                setLoading(false);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    }

    function refreshFreeFieldsFields() {
        setFilter([]);

        fetchFreeFieldsFields();
    }

    function onSubmitFilter() {
        setFreeFieldsFields([]);

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
            filters.push({ field: 'tableName', data: filter.tableName });
        }

        if (filter.statusId) {
            filters.push({ field: 'fieldName', data: filter.fieldName });
        }

        if (filter.emailedTo) {
            filters.push({ field: 'fieldFormatName', data: filter.fieldFormatName });
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
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshFreeFieldsFields} />
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

            <form onKeyUp={handleKeyUp} className={'margin-10-top'}>
                <DataTable>
                    <DataTableHead>
                        <FreeFieldsListHead handleChangeSort={handleChangeSort} />
                        <FreeFieldsListFilter filter={filter} handleChangeFilter={handleChangeFilter} />
                    </DataTableHead>
                    <DataTableBody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3}>Bezig met gegevens laden</td>
                            </tr>
                        ) : freeFieldsFields.length > 0 ? (
                            freeFieldsFields.map(freeFieldsField => {
                                return <FreeFieldsListItem key={freeFieldsField.id} {...freeFieldsField} />;
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
                        recordsPerPage={recordsPerPage}
                    />
                </div>
            </form>
        </div>
    );
}

export default FreeFieldsList;
