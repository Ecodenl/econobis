import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMeasures, clearMeasures } from '../../../actions/measure/MeasureActions';
import MeasuresListToolbar from './MeasuresListToolbar';
import MeasuresList from './MeasuresList';

class MeasuresListApp extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchMeasures();
    }

    componentWillUnmount() {
        this.props.clearMeasures();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <MeasuresListToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <MeasuresList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchMeasures: () => {
        dispatch(fetchMeasures());
    },
    clearMeasures: () => {
        dispatch(clearMeasures());
    },
});
export default connect(null, mapDispatchToProps)(MeasuresListApp);