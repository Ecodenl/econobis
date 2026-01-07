import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';

import {
    clearQuotationRequests,
    fetchQuotationRequests,
} from '../../../actions/quotation-request/QuotationRequestsActions';
import { clearFilterQuotationRequests } from '../../../actions/quotation-request/QuotationRequestsFiltersActions';
import { setQuotationRequestsPagination } from '../../../actions/quotation-request/QuotationRequestsPaginationActions';
import QuotationRequestsList from './QuotationRequestsList';
import QuotationRequestsListToolbar from './QuotationRequestsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestsAPI';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

function QuotationRequestsListApp() {
    const [multiSelectEnabled, setMultiSelectEnabled] = useState(false);
    const [opportunityActionType, setOpportunityActionType] = useState('all');
    const [opportunityActionId, setOpportunityActionId] = useState(0);
    const [opportunityActionName, setOpportunityActionName] = useState('');
    const quotationRequests = useSelector(state => state.quotationRequests.list);
    const quotationRequestsFilters = useSelector(state => state.quotationRequests.filters);
    const quotationRequestsSorts = useSelector(state => state.quotationRequests.sorts);
    const quotationRequestsPagination = useSelector(state => state.quotationRequests.pagination);
    const opportunityActions = useSelector(state => state.systemData.opportunityActions);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchQuotationRequestsData();
    }, [quotationRequestsFilters, quotationRequestsSorts, quotationRequestsPagination, opportunityActionId]);

    useEffect(() => {
        if (opportunityActionType === 'all') {
            setOpportunityActionId(0);
            setOpportunityActionName('');
            setMultiSelectEnabled(false);
        } else {
            const opportunityAction = opportunityActions.find(
                opportunityAction => opportunityAction.codeRef === opportunityActionType
            );
            if (opportunityAction) {
                setOpportunityActionId(opportunityAction.id);
                setOpportunityActionName(opportunityAction.name);
            }

            setMultiSelectEnabled(true);
        }
    }, [opportunityActionType]);

    function getCSV() {
        dispatch(blockUI());
        let filters = filterHelper(quotationRequestsFilters);
        if (opportunityActionId > 0) {
            filters = [...filters, { field: 'opportunityActionId', data: opportunityActionId }];
        }
        const sorts = quotationRequestsSorts;

        QuotationRequestAPI.getCSV({ filters, sorts })
            .then(payload => {
                fileDownload(payload.data, 'kansacties-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
                dispatch(unblockUI());
            })
            .catch(error => {
                dispatch(unblockUI());
            });
    }

    function fetchQuotationRequestsData() {
        let filters = filterHelper(quotationRequestsFilters);
        if (opportunityActionId > 0) {
            filters = [...filters, { field: 'opportunityActionId', data: opportunityActionId }];
        }

        const sorts = quotationRequestsSorts;
        const pagination = { limit: 20, offset: quotationRequestsPagination.offset };

        dispatch(fetchQuotationRequests(filters, sorts, pagination));
    }

    function resetQuotationRequestFilters() {
        dispatch(clearFilterQuotationRequests());
    }

    function onSubmitFilter() {
        dispatch(clearQuotationRequests());
        dispatch(setQuotationRequestsPagination({ page: 0, offset: 0 }));
    }

    function handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        dispatch(setQuotationRequestsPagination({ page, offset }));
    }

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <QuotationRequestsListToolbar
                        resetQuotationRequestFilters={resetQuotationRequestFilters}
                        getCSV={getCSV}
                        opportunityActionType={opportunityActionType}
                        setOpportunityActionType={setOpportunityActionType}
                    />
                </div>

                <div className="col-md-12 margin-10-top">
                    <QuotationRequestsList
                        quotationRequests={quotationRequests}
                        multiSelectEnabled={multiSelectEnabled}
                        setOpportunityActionTypeAll={() => setOpportunityActionType('all')}
                        quotationRequestsPagination={quotationRequestsPagination}
                        onSubmitFilter={onSubmitFilter}
                        refreshQuotationRequestsData={() => fetchQuotationRequestsData()}
                        handlePageClick={handlePageClick}
                        opportunityActionType={opportunityActionType}
                        opportunityActionId={opportunityActionId}
                        opportunityActionName={opportunityActionName}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default QuotationRequestsListApp;
