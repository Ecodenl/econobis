import React from 'react';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { hashHistory } from 'react-router';

const PortalSettingsDashboardWidgetListToolbar = props => {
    const newPortalSettingsLayout = () => {
        hashHistory.push(`/portal-instellingen-dashboard-widget/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-2">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName="glyphicon-plus" onClickAction={newPortalSettingsLayout} />
                </div>
            </div>
            <div className="col-md-8">
                <h4 className="text-center table-title">Widgets</h4>
            </div>
            <div className="col-md-2">
                <div className="pull-right">Resultaten: {props.widgets.length || 0}</div>
            </div>
        </div>
    );
};

export default PortalSettingsDashboardWidgetListToolbar;
