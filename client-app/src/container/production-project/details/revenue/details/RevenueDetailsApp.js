import React, { Component } from 'react';
import { connect } from 'react-redux';

import RevenueDetailsToolbar from './RevenueDetailsToolbar';
import RevenueDetailsForm from './RevenueDetailsForm';
// import CampaignDetailsHarmonica from './CampaignDetailsHarmonica';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from '../../../../../components/panel/PanelBody';

import { fetchRevenue, clearRevenue } from '../../../../../actions/production-project/ProductionProjectDetailsActions';

class RevenueDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRevenue(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearRevenue();
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenueDetailsToolbar/>
                    </div>

                    <div className="col-md-12">
                        <RevenueDetailsForm/>
                    </div>
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        {/*<CampaignDetailsHarmonica id={this.props.params.id}/>*/}
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRevenue: (id) => {
        dispatch(fetchRevenue(id));
    },
    clearRevenue: () => {
        dispatch(clearRevenue());
    },
});

export default connect(null, mapDispatchToProps)(RevenueDetailsApp);