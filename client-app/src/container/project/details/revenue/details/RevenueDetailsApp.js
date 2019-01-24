import React, { Component } from 'react';
import { connect } from 'react-redux';

import RevenueDetailsToolbar from './RevenueDetailsToolbar';
import RevenueDetailsForm from './RevenueDetailsForm';

import { fetchRevenue, clearRevenue } from '../../../../../actions/project/ProjectDetailsActions';

class RevenueDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRevenue(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearRevenue();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <RevenueDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <RevenueDetailsForm />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRevenue: id => {
        dispatch(fetchRevenue(id));
    },
    clearRevenue: () => {
        dispatch(clearRevenue());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(RevenueDetailsApp);
