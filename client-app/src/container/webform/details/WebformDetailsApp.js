import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWebformDetails } from '../../../actions/webform/WebformDetailsActions';
import WebformDetailsToolbar from './WebformDetailsToolbar';
import WebformDetailsForm from './WebformDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const WebformDetailsAppWrapper = props => {
    const params = useParams();
    return <WebformDetailsApp {...props} params={params} />;
};

class WebformDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchWebformDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <WebformDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <WebformDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        webformDetails: state.webformDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchWebformDetails: id => {
        dispatch(fetchWebformDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WebformDetailsAppWrapper);
