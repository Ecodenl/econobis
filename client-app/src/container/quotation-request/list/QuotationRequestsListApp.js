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
    const quotationRequests = useSelector(state => state.quotationRequests.list);
    const quotationRequestsFilters = useSelector(state => state.quotationRequests.filters);
    const quotationRequestsSorts = useSelector(state => state.quotationRequests.sorts);
    const quotationRequestsPagination = useSelector(state => state.quotationRequests.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchQuotationRequestsData();
    }, [quotationRequestsPagination]);

    const getCSV = () => {
        dispatch(blockUI());
        setTimeout(() => {
            const filters = filterHelper(quotationRequestsFilters);
            const sorts = quotationRequestsSorts;

            QuotationRequestAPI.getCSV({ filters, sorts })
                .then(payload => {
                    fileDownload(payload.data, 'kansacties-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
                    dispatch(unblockUI());
                })
                .catch(error => {
                    dispatch(unblockUI());
                });
        }, 100);
    };

    const fetchQuotationRequestsData = () => {
        setTimeout(() => {
            const filters = filterHelper(quotationRequestsFilters);
            const sorts = quotationRequestsSorts;
            const pagination = { limit: 20, offset: quotationRequestsPagination.offset };

            dispatch(fetchQuotationRequests(filters, sorts, pagination));
        }, 100);
    };

    const resetQuotationRequestFilters = () => {
        dispatch(clearFilterQuotationRequests());
        fetchQuotationRequestsData();
    };

    const onSubmitFilter = () => {
        const filters = filterHelper(quotationRequestsFilters);
        const sorts = quotationRequestsSorts;

        dispatch(setQuotationRequestsPagination({ page: 0, offset: 0 }));

        setTimeout(() => {
            fetchQuotationRequestsData();
        }, 100);
    };

    const handlePageClick = data => {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        dispatch(setQuotationRequestsPagination({ page, offset }));
    };

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <QuotationRequestsListToolbar
                        resetQuotationRequestFilters={resetQuotationRequestFilters}
                        getCSV={getCSV}
                        setMultiSelectEnabled={() => setMultiSelectEnabled(!multiSelectEnabled)}
                    />
                </div>

                <div className="col-md-12 margin-10-top">
                    <QuotationRequestsList
                        quotationRequests={quotationRequests}
                        multiSelectEnabled={multiSelectEnabled}
                        quotationRequestsPagination={quotationRequestsPagination}
                        onSubmitFilter={onSubmitFilter}
                        refreshQuotationRequestsData={fetchQuotationRequestsData}
                        handlePageClick={handlePageClick}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}

export default QuotationRequestsListApp;
