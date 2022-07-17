import React, { Component } from 'react';

import PortalSettingsDashboardWidgetDetailsToolbar from './PortalSettingsDashboardWidgetDetailsToolbar';
import PortalSettingsDashboardWidgetDetailsForm from './PortalSettingsDashboardWidgetDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PortalSettingsDashboardAPI from '../../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import axios from 'axios';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';

class PortalSettingsDashboardWidgetDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsDashboardWidget: {},
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
                PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id),
                ContactGroupAPI.peekContactGroups(),
            ])
            .then(
                axios.spread((portalSettingsDashboardWidget, dashboardSettings, contactGroups) => {
                    this.setState({
                        isLoading: false,
                        portalSettingsDashboardWidget: portalSettingsDashboardWidget.data.data,
                        dashboardSettings: dashboardSettings.data,
                        contactGroups: contactGroups,
                    });
                })
            )
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deletePortalSettingsDashboardWidget = id => {
        // Api aanroepen met delete
        PortalSettingsDashboardAPI.deletePortalSettingsDashboardWidget(id)
            .then(payload => {
                hashHistory.push(`/portal-instellingen-dashboard`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
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
                                    description={this.state.portalSettingsDashboardWidget.title || ''}
                                    id={this.state.portalSettingsDashboardWidget.id}
                                    deletePortalSettingsDashboardWidget={this.deletePortalSettingsDashboardWidget}
                                    permissions={this.props.permissions}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsDashboardWidgetDetailsForm
                            portalSettingsDashboardWidget={this.state.portalSettingsDashboardWidget}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetDetailsApp);
