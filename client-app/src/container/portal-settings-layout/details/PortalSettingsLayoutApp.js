import React, { Component } from 'react';

import PortalSettingsLayoutToolbar from './PortalSettingsLayoutToolbar';
import PortalSettingsLayoutForm from './PortalSettingsLayoutForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsLayoutDetailsAPI from '../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class PortalSettingsLayoutDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsLayout: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsLayoutDetails();
    }

    callFetchPortalSettingsLayoutDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        PortalSettingsLayoutDetailsAPI.fetchPortalSettingsLayoutDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    portalSettingsLayout: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deletePortalSettingsLayout = id => {
        // Api aanroepen met delete
        PortalSettingsLayoutDetailsAPI.deletePortalSettingsLayout(id)
            .then(payload => {
                hashHistory.push(`/portal-instellingen-layout`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    updateState = portalSettingsLayout => {
        this.setState({ portalSettingsLayout });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <PortalSettingsLayoutToolbar
                                    description={this.state.portalSettingsLayout.description || ''}
                                    id={this.state.portalSettingsLayout.id}
                                    isDefault={this.state.portalSettingsLayout.isDefault}
                                    deletePortalSettingsLayout={this.deletePortalSettingsLayout}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsLayoutForm
                            portalSettingsLayout={this.state.portalSettingsLayout}
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

export default connect(null, mapDispatchToProps)(PortalSettingsLayoutDetailsApp);
