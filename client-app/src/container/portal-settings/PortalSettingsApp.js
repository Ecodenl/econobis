import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortalSettingsForm from './PortalSettingsForm';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

// import { fetchPortalSettings, clearPortalSettings } from '../../../actions/portal-settings/PortalSettingsActions';

class PortalSettingsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.fetchPortalSettings();
    }

    componentWillUnmount() {
        // this.props.clearPortalSettings();
    }

    // refreshPortalSettingsData = () => {
    //     this.props.clearPortalSettings();
    //     this.props.fetchPortalSettings();
    // };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <h1>Portal instellingen</h1>
                        <PortalSettingsForm portalSettings={this.props.portalSettings} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        portalSettings: state.portalSettings,
    };
};

const mapDispatchToProps = dispatch => ({
    // fetchPortalSettings: () => {
    //     dispatch(fetchPortalSettings());
    // },
    // clearPortalSettings: () => {
    //     dispatch(clearPortalSettings());
    // },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortalSettingsApp);
