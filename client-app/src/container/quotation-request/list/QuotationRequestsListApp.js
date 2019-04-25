import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestsAPI';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

class QuotationRequestsListApp extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
        this.getCSV = this.getCSV.bind(this);
    }

    componentDidMount() {
        this.fetchQuotationRequestsData();
    }

    componentWillUnmount() {
        this.props.clearQuotationRequests();
    }

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.quotationRequestsFilters);
            const sorts = this.props.quotationRequestsSorts;

            QuotationRequestAPI.getCSV({ filters, sorts })
                .then(payload => {
                    fileDownload(payload.data, 'Offerteverzoeken-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    fetchQuotationRequestsData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.quotationRequestsFilters);
            const sorts = this.props.quotationRequestsSorts;
            const pagination = { limit: 20, offset: this.props.quotationRequestsPagination.offset };

            this.props.fetchQuotationRequests(filters, sorts, pagination);
        }, 100);
    };

    resetQuotationRequestFilters = () => {
        this.props.clearFilterQuotationRequests();

        this.fetchQuotationRequestsData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.quotationRequestsFilters);
        const sorts = this.props.quotationRequestsSorts;

        this.props.setQuotationRequestsPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchQuotationRequestsData();
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setQuotationRequestsPagination({ page, offset });

        setTimeout(() => {
            this.fetchQuotationRequestsData();
        }, 100);
    }

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestsListToolbar
                            resetQuotationRequestFilters={() => this.resetQuotationRequestFilters()}
                            getCSV={this.getCSV}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestsList
                            quotationRequests={this.props.quotationRequests}
                            quotationRequestsPagination={this.props.quotationRequestsPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshQuotationRequestsData={() => this.fetchQuotationRequestsData()}
                            handlePageClick={this.handlePageClick}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotationRequests: state.quotationRequests.list,
        quotationRequestsFilters: state.quotationRequests.filters,
        quotationRequestsSorts: state.quotationRequests.sorts,
        quotationRequestsPagination: state.quotationRequests.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchQuotationRequests,
            clearQuotationRequests,
            setQuotationRequestsPagination,
            clearFilterQuotationRequests,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuotationRequestsListApp);
