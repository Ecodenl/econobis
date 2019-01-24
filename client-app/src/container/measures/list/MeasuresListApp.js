import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMeasures, clearMeasures } from '../../../actions/measure/MeasuresActions';
import MeasuresListToolbar from './MeasuresListToolbar';
import MeasuresList from './MeasuresList';

class MeasuresListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMeasures();
    }

    componentWillUnmount() {
        this.props.clearMeasures();
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <MeasuresListToolbar />
                        </div>
                        <div className="col-md-12 margin-10-top">
                            <MeasuresList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMeasures: () => {
        dispatch(fetchMeasures());
    },
    clearMeasures: () => {
        dispatch(clearMeasures());
    },
});
export default connect(
    null,
    mapDispatchToProps
)(MeasuresListApp);
