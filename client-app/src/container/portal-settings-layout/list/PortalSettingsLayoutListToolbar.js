import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

// Functionele wrapper voor de class component
const PortalSettingsLayoutListToolbarWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsLayoutListToolbar {...props} navigate={navigate} />;
};

class PortalSettingsLayoutListToolbar extends Component {
    render() {
        let { portalSettingsLayoutsCount, refreshPortalSettingsLayoutsData, permissions } = this.props;
        const newPortalSettingsLayout = () => {
            this.props.navigate(`/portal-instellingen-layout/nieuw`);
        };

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'refresh'} onClickAction={refreshPortalSettingsLayoutsData} />
                        {permissions.managePortalSettings && (
                            <ButtonIcon iconName={'plus'} onClickAction={newPortalSettingsLayout} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="text-center table-title">Portal instellingen layouts</h3>
                </div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {portalSettingsLayoutsCount}</div>
                </div>
            </div>
        );
    }
}

PortalSettingsLayoutListToolbar.propTypes = {
    portalSettingsLayoutsCount: PropTypes.any,
    refreshPortalSettingsLayoutsData: PropTypes.any,
    permissions: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(PortalSettingsLayoutListToolbarWrapper);
