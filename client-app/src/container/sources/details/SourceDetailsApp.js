import React, { Component } from 'react';

import SourceDetailsToolbar from './SourceDetailsToolbar';
import SourceDetailsForm from './SourceDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import SourceDetailsAPI from '../../../api/source/SourceDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const SourceDetailsAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <SourceDetailsApp {...props} navigate={navigate} params={params} />;
};

class SourceDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchSourceDetails();
    }

    callFetchSourceDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        SourceDetailsAPI.fetchSourceDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    source: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = source => {
        this.setState({ source });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <SourceDetailsToolbar
                                    name={this.state.source.name || ''}
                                    id={this.state.source.id}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <SourceDetailsForm
                            source={this.state.source}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(SourceDetailsAppWrapper);
