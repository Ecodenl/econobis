import React, { Component } from 'react';

import PortalSettingsDashboardToolbar from './PortalSettingsDashboardToolbar';
import PortalSettingsDashboardForm from './PortalSettingsDashboardForm';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import { setError } from '../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import PortalSettingsDashboardAPI from '../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import axios from 'axios';
import PortalSettingsLayoutDetailsAPI from '../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';

class PortalSettingsDashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultPortalSettingsLayout: {},
            dashboardSettings: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsDashboardDetails();
    }

    callFetchPortalSettingsDashboardDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        // todo WM: check / anders
        //
        const id = 1;
        axios
            .all([
                PortalSettingsLayoutDetailsAPI.fetchDefaultPortalSettingsLayoutDetails(),
                PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id),
            ])
            .then(
                axios.spread((defaultPortalSettingsLayout, dashboardSettings) => {
                    this.setState({
                        isLoading: false,
                        defaultPortalSettingsLayout: defaultPortalSettingsLayout.data.data,
                        dashboardSettings: {
                            ...dashboardSettings.data.data,
                        },
                    });
                })
            )
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = dashboardSettings => {
        this.setState({
            dashboardSettings: {
                ...dashboardSettings,
            },
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <PortalSettingsDashboardToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsDashboardForm
                            defaultPortalSettingsLayout={this.state.defaultPortalSettingsLayout}
                            dashboardSettings={this.state.dashboardSettings}
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardApp);
