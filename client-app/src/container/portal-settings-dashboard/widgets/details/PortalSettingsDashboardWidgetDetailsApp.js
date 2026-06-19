import React, { Component } from 'react';

import PortalSettingsDashboardWidgetDetailsToolbar from './PortalSettingsDashboardWidgetDetailsToolbar';
import PortalSettingsDashboardWidgetDetailsForm from './PortalSettingsDashboardWidgetDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PortalSettingsDashboardAPI from '../../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import axios from 'axios';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import PortalSettingsLayoutDetailsAPI from '../../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';

// Functionele wrapper voor de class component
const PortalSettingsDashboardWidgetDetailsAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <PortalSettingsDashboardWidgetDetailsApp {...props} navigate={navigate} params={params} />;
};

class PortalSettingsDashboardWidgetDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsDashboardWidget: {},
            defaultPortalSettingsLayout: {},
            dashboardSettings: {},
            contactGroups: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsDashboardWidgetDetails();
    }

    callFetchPortalSettingsDashboardWidgetDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        // todo WM: check anders
        //
        const id = 1;
        axios
            .all([
                PortalSettingsDashboardAPI.fetchPortalSettingsDashboardWidgetDetails(this.props.params.id),
                PortalSettingsLayoutDetailsAPI.fetchDefaultPortalSettingsLayoutDetails(),
                PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id),
                ContactGroupAPI.peekContactGroups(),
            ])
            .then(
                axios.spread(
                    (portalSettingsDashboardWidget, defaultPortalSettingsLayout, dashboardSettings, contactGroups) => {
                        this.setState({
                            isLoading: false,
                            portalSettingsDashboardWidget: portalSettingsDashboardWidget.data.data,
                            defaultPortalSettingsLayout: defaultPortalSettingsLayout.data.data,
                            dashboardSettings: dashboardSettings.data.data,
                            contactGroups: contactGroups,
                        });
                    }
                )
            )
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deletePortalSettingsDashboardWidget = id => {
        // Api aanroepen met delete
        PortalSettingsDashboardAPI.deletePortalSettingsDashboardWidget(id)
            .then(payload => {
                this.props.navigate(`/portal-instellingen-dashboard`);
            })
            .catch(error => {
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    updateState = portalSettingsDashboardWidget => {
        this.setState({ portalSettingsDashboardWidget });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className="panel-small">
                                <PortalSettingsDashboardWidgetDetailsToolbar
                                    portalSettingsDashboardWidget={this.state.portalSettingsDashboardWidget}
                                    deletePortalSettingsDashboardWidget={this.deletePortalSettingsDashboardWidget}
                                    permissions={this.props.permissions}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsDashboardWidgetDetailsForm
                            portalSettingsDashboardWidget={this.state.portalSettingsDashboardWidget}
                            defaultPortalSettingsLayout={this.state.defaultPortalSettingsLayout}
                            dashboardSettings={this.state.dashboardSettings}
                            contactGroups={this.state.contactGroups}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetDetailsAppWrapper);
