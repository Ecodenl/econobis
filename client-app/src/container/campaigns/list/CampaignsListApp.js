import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCampaigns, clearCampaigns } from '../../../actions/campaign/CampaignsActions';
import CampaignsListToolbar from './CampaignsListToolbar';
import CampaignsList from './CampaignsList';

class CampaignsListApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            opportunities: [],
        };

    }

    componentDidMount() {
        this.props.fetchCampaigns();
    }

    componentWillUnmount() {
        this.props.clearCampaigns();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <CampaignsListToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <CampaignsList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCampaigns: () => {
        dispatch(fetchCampaigns());
    },
    clearCampaigns: () => {
        dispatch(clearCampaigns());
    },
});
export default connect(null, mapDispatchToProps)(CampaignsListApp);