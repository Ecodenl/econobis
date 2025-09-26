import React, { Component } from 'react';

import SourcesList from './SourcesList';
import SourcesListToolbar from './SourcesListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import IntakeSourceAPI from '../../../api/intake/IntakeSourceAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';

class SourcesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sources: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchSourcesData();
    }
    callFetchSourcesData = () => {
        this.setState({ isLoading: true, hasError: false });
        IntakeSourceAPI.fetchSources()

            .then(payload => {
                this.setState({ isLoading: false, sources: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <SourcesListToolbar
                            sourcesCount={this.state.sources ? this.state.sources.length : 0}
                            refreshSourcesData={this.callFetchSourcesData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <SourcesList
                            sources={this.state.sources}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(SourcesListApp);
