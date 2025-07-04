import React, { Component } from 'react';

import PortalSettingsForm from './PortalSettingsForm';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import PortalSettingsToolbar from './PortalSettingsToolbar';
import PortalSettingsAPI from '../../api/portal-settings/PortalSettingsAPI';

// import { fetchPortalSettings, clearPortalSettings } from '../../../actions/portal-settings/PortalSettingsActions';

class PortalSettingsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettings: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsDetails();
    }

    callFetchPortalSettingsDetails = () => {
        this.setState({ isLoading: true, hasError: false });

        // todo WM: check / anders
        //
        const portalSettingsId = 1;

        PortalSettingsAPI.fetchPortalSettingsDetails(portalSettingsId)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    portalSettings: {
                        ...payload.data.data,
                        // portalActive: payload.data.data.portalActive == 'true',
                        // showNewAtCooperativeLink: payload.data.data.showNewAtCooperativeLink == 'true',
                        pcrPowerKwhConsumptionPercentage: payload.data.data.pcrPowerKwhConsumptionPercentage,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = portalSettings => {
        this.setState({
            portalSettings: {
                ...portalSettings,
                // portalActive: portalSettings.portalActive == 'true',
                // showNewAtCooperativeLink: portalSettings.showNewAtCooperativeLink == 'true',
                pcrPowerKwhConsumptionPercentage: portalSettings.pcrPowerKwhConsumptionPercentage,
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
                                <PortalSettingsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsForm
                            portalSettings={this.state.portalSettings}
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

export default PortalSettingsApp;
