import React, { Component } from 'react';

import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import PortalSettingsDashboardToolbar from './PortalSettingsDashboardToolbar';
import PortalSettingsDashboardForm from './PortalSettingsDashboardForm';
import PortalSettingsDashboardAPI from '../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';

class PortalSettingsDashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    dashboardSettings: {
                        ...payload.data.data,
                    },
                });
            })
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
                            dashboardSettings={this.state.dashboardSettings}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top"></div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default PortalSettingsDashboardApp;
