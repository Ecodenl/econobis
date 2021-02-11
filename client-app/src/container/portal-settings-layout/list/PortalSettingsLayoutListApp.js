import React, { Component } from 'react';

import PortalSettingsLayoutList from './PortalSettingsLayoutList';
import PortalSettingsLayoutListToolbar from './PortalSettingsLayoutListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsLayoutAPI from '../../../api/portal-settings-layout/PortalSettingsLayoutAPI';
import PortalSettingsLayoutDetailsAPI from '../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';

class PortalSettingsLayoutListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsLayouts: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsLayoutsData();
    }

    callFetchPortalSettingsLayoutsData = () => {
        this.setState({ isLoading: true, hasError: false });
        PortalSettingsLayoutAPI.fetchPortalSettingsLayouts()
            .then(payload => {
                this.setState({ isLoading: false, portalSettingsLayouts: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deletePortalSettingsLayout = id => {
        // Api aanroepen met delete
        PortalSettingsLayoutDetailsAPI.deletePortalSettingsLayout(id)
            .then(payload => {
                this.setState({
                    portalSettingsLayouts: this.state.portalSettingsLayouts.filter(
                        portalSettingsLayout => portalSettingsLayout.id !== id
                    ),
                });
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsLayoutListToolbar
                            portalSettingsLayoutsCount={
                                this.state.portalSettingsLayouts ? this.state.portalSettingsLayouts.length : 0
                            }
                            refreshPortalSettingsLayoutsData={this.callFetchPortalSettingsLayoutsData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsLayoutList
                            portalSettingsLayouts={this.state.portalSettingsLayouts}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            deletePortalSettingsLayout={this.deletePortalSettingsLayout}
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

export default connect(null, mapDispatchToProps)(PortalSettingsLayoutListApp);
