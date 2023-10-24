import React, { useEffect, useState } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import FreeFieldsList from './FreeFieldsList';
import FreeFieldsListToolbar from './FreeFieldsListToolbar';
import useKeyPress from '../../../helpers/useKeyPress';
import axios from 'axios';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';

const recordsPerPage = 50;

function FreeFieldsListApp() {
    const [freeFieldsFields, setFreeFieldsFields] = useState([]);
    const [freeFieldsTables, setFreeFieldsTables] = useState([]);
    const [freeFieldsFieldFormats, setFreeFieldsFieldFormats] = useState([]);
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
        axios
            .all([FreeFieldsAPI.fetchFreeFieldsFields(formatFilterHelper(), sort, pagination)])
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
        fetchFreeFieldsTables();
        fetchFreeFieldsFieldFormats();
    }

    function fetchFreeFieldsTables() {
        FreeFieldsAPI.peekFreeFieldsTables()
            .then(data => {
                setFreeFieldsTables(data.data.data);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met ophalen van de op onderdeel opties.');
            });
    }

    function fetchFreeFieldsFieldFormats() {
        FreeFieldsAPI.peekFreeFieldsFieldFormats()
            .then(data => {
                setFreeFieldsFieldFormats(data.data.data);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met ophalen van de op onderdeel opties.');
            });
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
        if (filter.tableName) {
            filters.push({ field: 'tableName', data: filter.tableName });
        }

        if (filter.fieldName) {
            filters.push({ field: 'fieldName', data: filter.fieldName });
        }

        if (filter.fieldFormatName) {
            filters.push({ field: 'fieldFormatName', data: filter.fieldFormatName });
        }
        return filters;
    }

    // On key Enter filter form will submit
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            onSubmitFilter();
            console.log('handleKeyUp');
        }
    }

    function deleteFreeFieldsField(freeFieldsField) {
        FreeFieldsAPI.deleteFreeFieldsField(freeFieldsField)
            .then(payload => {
                fetchFreeFieldsFields();
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
                    <FreeFieldsListToolbar
                        freeFieldsTotal={meta.total}
                        refreshFreeFieldsFields={fetchFreeFieldsFields}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <FreeFieldsList
                        freeFieldsFields={freeFieldsFields}
                        freeFieldsTotal={meta.total}
                        recordsPerPage={recordsPerPage}
                        isLoading={isLoading}
                        filter={filter}
                        handlePageClick={handlePageClick}
                        handleChangeSort={handleChangeSort}
                        handleChangeFilter={handleChangeFilter}
                        handleKeyUp={handleKeyUp}
                        deleteFreeFieldsField={deleteFreeFieldsField}
                        freeFieldsTables={freeFieldsTables}
                        freeFieldsFieldFormats={freeFieldsFieldFormats}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default FreeFieldsListApp;
