import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    clearOpportunities,
    fetchOpportunities,
    setCheckedOpportunityAll,
} from '../../../actions/opportunity/OpportunitiesActions';
import { setOpportunitiesPagination } from '../../../actions/opportunity/OpportunitiesPaginationActions';
import { clearFilterOpportunity } from '../../../actions/opportunity/OpportunitiesFiltersActions';
import OpportunitiesListToolbar from './OpportunitiesListToolbar';
import OpportunitiesList from './OpportunitiesList';
import filterHelper from '../../../helpers/FilterHelper';
import moment from 'moment/moment';
import fileDownload from 'js-file-download';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import OpportunitiesAPI from '../../../api/opportunity/OpportunitiesAPI';

class OpportunitiesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCheckboxList: false,
        };

        this.fetchOpportunitiesData = this.fetchOpportunitiesData.bind(this);
        this.resetOpportunitiesFilters = this.resetOpportunitiesFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getCSV = this.getCSV.bind(this);
    }

    componentDidMount() {
        this.fetchOpportunitiesData();
    }

    componentWillUnmount() {
        this.props.clearOpportunities();
    }

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.opportunitiesFilters);
            const sorts = this.props.opportunitiesSorts;

            OpportunitiesAPI.getCSV({ filters, sorts })
                .then(payload => {
                    fileDownload(payload.data, 'Kansen-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv');
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    fetchOpportunitiesData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.opportunitiesFilters);
            const sorts = this.props.opportunitiesSorts;
            const pagination = { limit: 20, offset: this.props.opportunitiesPagination.offset };

            this.props.fetchOpportunities(filters, sorts, pagination);
        }, 100);
    }

    resetOpportunitiesFilters() {
        this.props.clearFilterOpportunity();

        this.fetchOpportunitiesData();
    }

    onSubmitFilter() {
        this.props.clearOpportunities();

        this.props.setOpportunitiesPagination({ page: 0, offset: 0 });

        this.fetchOpportunitiesData();
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setOpportunitiesPagination({ page, offset });

        this.fetchOpportunitiesData();
    }

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList,
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <OpportunitiesListToolbar
                                toggleShowCheckboxList={() => this.toggleShowCheckboxList()}
                                resetOpportunitiesFilters={() => this.resetOpportunitiesFilters()}
                                getCSV={this.getCSV}
                            />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <OpportunitiesList
                                handlePageClick={this.handlePageClick}
                                fetchOpportunitiesData={this.fetchOpportunitiesData}
                                showCheckboxList={this.state.showCheckboxList}
                                onSubmitFilter={() => this.onSubmitFilter()}
                                opportunitiesPagination={this.props.opportunitiesPagination}
                                opportunities={this.props.opportunities}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        opportunities: state.opportunities.list,
        opportunitiesFilters: state.opportunities.filters,
        opportunitiesSorts: state.opportunities.sorts,
        opportunitiesPagination: state.opportunities.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchOpportunities,
            clearOpportunities,
            setOpportunitiesPagination,
            setCheckedOpportunityAll,
            clearFilterOpportunity,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListApp);
