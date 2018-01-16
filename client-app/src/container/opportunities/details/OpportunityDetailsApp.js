import React, { Component } from 'react';
import { connect } from 'react-redux';

import OpportunityDetailsToolbar from './OpportunityDetailsToolbar';
import OpportunityDetailsForm from './OpportunityDetailsForm';
import OpportunityDetailsHarmonica from './../harmonica/OpportunityDetailsHarmonica';
import Panel from "../../../components/panel/Panel";
import PanelBody from '../../../components/panel/PanelBody';

import { fetchOpportunity, clearOpportunity } from '../../../actions/opportunity/OpportunityDetailsActions';

class OpportunityDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOpportunity(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearOpportunity();
    };
    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <OpportunityDetailsToolbar/>
                    </div>

                    <div className="col-md-12">
                        <OpportunityDetailsForm/>
                    </div>
                </div>
                <Panel className="col-md-3">
                    <PanelBody>
                        <OpportunityDetailsHarmonica id={this.props.params.id}/>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunity: (id) => {
        dispatch(fetchOpportunity(id));
    },
    clearOpportunity: () => {
        dispatch(clearOpportunity());
    },
});

export default connect(null, mapDispatchToProps)(OpportunityDetailsApp);