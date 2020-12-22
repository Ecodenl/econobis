import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';

class PortalSettingsLayoutListToolbar extends Component {
    render() {
        let { portalSettingsLayoutsCount, refreshPortalSettingsLayoutsData, permissions } = this.props;
        const newPortalSettingsLayout = () => {
            hashHistory.push(`/portal-instellingen-layout/nieuw`);
        };

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={refreshPortalSettingsLayoutsData} />
                        {permissions.manageFinancial && (
                            <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newPortalSettingsLayout} />
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

export default connect(mapStateToProps, null)(PortalSettingsLayoutListToolbar);
