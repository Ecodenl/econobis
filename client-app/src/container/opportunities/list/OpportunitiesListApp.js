import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOpportunities, clearOpportunities, setCheckedOpportunityAll } from '../../../actions/opportunity/OpportunitiesActions';
import { setOpportunitiesPagination } from '../../../actions/opportunity/OpportunitiesPaginationActions';
import OpportunitiesListToolbar from './OpportunitiesListToolbar';
import OpportunitiesList from './OpportunitiesList';

class OpportunitiesListApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            opportunities: [],
            showCheckboxList: false,
            checkedAllCheckboxes: false,
        };

        this.fetchOpportunitiesData = this.fetchOpportunitiesData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchOpportunitiesData();
    }

    componentWillUnmount() {
        this.props.clearOpportunities();
    };

    fetchOpportunitiesData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.opportunitiesPagination.offset };

            this.props.fetchOpportunities(pagination);
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setOpportunitiesPagination({page, offset});

        this.fetchOpportunitiesData();
    };

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList
        });
    };

    selectAllCheckboxes = () => {
        this.setState({
            checkedAllCheckboxes: !this.state.checkedAllCheckboxes
        });

        this.props.setCheckedOpportunityAll(!this.state.checkedAllCheckboxes);
    };


    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <OpportunitiesListToolbar toggleShowCheckboxList={() => this.toggleShowCheckboxList()}/>
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <OpportunitiesList
                                handlePageClick={this.handlePageClick}
                                fetchOpportunitiesData={this.fetchOpportunitiesData}
                                showCheckboxList={this.state.showCheckboxList}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        opportunitiesPagination: state.opportunities.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunities: (pagination) => {
        dispatch(fetchOpportunities(pagination));
    },
    clearOpportunities: () => {
        dispatch(clearOpportunities());
    },
    setOpportunitiesPagination: (pagination) => {
        dispatch(setOpportunitiesPagination(pagination));
    },
    setCheckedOpportunityAll: (checkValue) => {
        dispatch(setCheckedOpportunityAll(checkValue));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListApp);