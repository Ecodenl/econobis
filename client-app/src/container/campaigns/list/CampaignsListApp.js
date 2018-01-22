import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCampaigns, clearCampaigns } from '../../../actions/campaign/CampaignsActions';
import { setCampaignsPagination } from '../../../actions/campaign/CampaignsPaginationActions';
import CampaignsListToolbar from './CampaignsListToolbar';
import CampaignsList from './CampaignsList';

class CampaignsListApp extends Component {
    constructor(props){
        super(props);

        this.fetchCampaignsData = this.fetchCampaignsData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    };

    componentDidMount() {
        this.fetchCampaignsData();
    };

    componentWillUnmount() {
        this.props.clearCampaigns();
    };

    fetchCampaignsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.campaignsPagination.offset };

            this.props.fetchCampaigns(pagination);
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setCampaignsPagination({page, offset});

        this.fetchCampaignsData();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default col-md-10">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <CampaignsListToolbar/>
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <CampaignsList
                                handlePageClick={this.handlePageClick}
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
        campaignsPagination: state.campaigns.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaigns: (pagination) => {
        dispatch(fetchCampaigns(pagination));
    },
    clearCampaigns: () => {
        dispatch(clearCampaigns());
    },
    setCampaignsPagination: (pagination) => {
        dispatch(setCampaignsPagination(pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsListApp);