import React, { Component } from 'react';
import { connect } from 'react-redux';

import CampaignDetailsToolbar from './CampaignDetailsToolbar';
import CampaignDetailsForm from './CampaignDetailsForm';
import CampaignDetailsHarmonica from './CampaignDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { fetchCampaign, clearCampaign } from '../../../actions/campaign/CampaignDetailsActions';

class CampaignDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchCampaignData();
    }

    componentWillUnmount() {
        this.props.clearCampaign();
    }

    fetchCampaignData() {
        setTimeout(() => {
            const pagination = { page: this.props.campaignPagination.page };

            this.props.fetchCampaign(this.props.params.id, pagination);
        }, 100);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <CampaignDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <CampaignDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <CampaignDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaignPagination: state.campaignDetails.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id, pagination) => {
        dispatch(fetchCampaign(id, pagination));
    },
    clearCampaign: () => {
        dispatch(clearCampaign());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsApp);
