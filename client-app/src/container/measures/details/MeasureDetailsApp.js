import React, { Component } from 'react';
import { connect } from 'react-redux';

import MeasureDetailsToolbar from './MeasureDetailsToolbar';
import MeasureDetailsForm from './MeasureDetailsForm';
import MeasureDetailsHarmonica from './MeasureDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import { fetchMeasure, clearMeasure } from '../../../actions/measure/MeasureDetailsActions';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const MeasureDetailsAppWrapper = props => {
    const params = useParams();
    return <MeasureDetailsApp {...props} params={params} />;
};

class MeasureDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMeasure(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearMeasure();
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <MeasureDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <MeasureDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <MeasureDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMeasure: id => {
        dispatch(fetchMeasure(id));
    },
    clearMeasure: () => {
        dispatch(clearMeasure());
    },
});

export default connect(null, mapDispatchToProps)(MeasureDetailsAppWrapper);
