import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOpportunities, clearOpportunities } from '../../../actions/OpportunitiesActions';
import OpportunitiesListToolbar from './OpportunitiesListToolbar';
import OpportunitiesList from './OpportunitiesList';

class OpportunitiesListApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            opportunities: [],
        };

    }

    componentDidMount() {
        this.props.fetchOpportunities();
    }

    componentWillUnmount() {
        this.props.clearOpportunities();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <OpportunitiesListToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <OpportunitiesList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunities: () => {
        dispatch(fetchOpportunities());
    },
    clearOpportunities: () => {
        dispatch(clearOpportunities());
    },
});
export default connect(null, mapDispatchToProps)(OpportunitiesListApp);