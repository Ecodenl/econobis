import React, { Component } from 'react';

import PortalSettingsLayoutToolbar from './PortalSettingsLayoutToolbar';
import PortalSettingsLayoutForm from './PortalSettingsLayoutForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsLayoutDetailsAPI from '../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import axios from 'axios';

// Functionele wrapper voor de class component
const PortalSettingsLayoutDetailsAppWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsLayoutDetailsApp {...props} navigate={navigate} />;
};

class PortalSettingsLayoutDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettingsLayout: {},
            dashboardSettings: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchPortalSettingsLayoutDetails();
    }

    callFetchPortalSettingsLayoutDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        // todo WM: check anders
        //
        const id = 1;
        axios
            .all([
                PortalSettingsLayoutDetailsAPI.fetchPortalSettingsLayoutDetails(this.props.params.id),
                PortalSettingsDashboardAPI.fetchPortalSettingsDashboardDetails(id),
            ])
            .then(
                axios.spread((portalSettingsLayout, dashboardSettings) => {
                    this.setState({
                        isLoading: false,
                        portalSettingsLayout: portalSettingsLayout.data.data,
                        dashboardSettings: dashboardSettings.data.data,
                    });
                })
            )
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deletePortalSettingsLayout = id => {
        // Api aanroepen met delete
        PortalSettingsLayoutDetailsAPI.deletePortalSettingsLayout(id)
            .then(payload => {
                this.props.navigate(`/portal-instellingen-layout`);
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
                                    permissions={this.props.permissions}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <PortalSettingsLayoutForm
                            portalSettingsLayout={this.state.portalSettingsLayout}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsLayoutDetailsAppWrapper);
