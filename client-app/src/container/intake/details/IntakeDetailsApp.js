import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchIntakeDetails } from '../../../actions/intake/IntakeDetailsActions';
import IntakeDetailsToolbar from './IntakeDetailsToolbar';
import IntakeDetailsForm from './IntakeDetailsForm';
import IntakeDetailsHarmonica from './IntakeDetailsHarmonica';

import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const IntakeDetailsAppWrapper = props => {
    const params = useParams();
    return <IntakeDetailsApp {...props} params={params} />;
};

class IntakeDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchIntakeDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <IntakeDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <IntakeDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <IntakeDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchIntakeDetails: id => {
        dispatch(fetchIntakeDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(IntakeDetailsAppWrapper);
