import React from 'react';

import ButtonIcon from '../../../components/button/ButtonIcon';

const PortalSettingsDashboardWidgetListToolbar = props => {
    return (
        <div className="row">
            <div className="col-md-2">
                <div className="btn-group btn-group-flex" role="group">
                    <ButtonIcon iconName="glyphicon-plus" onClickAction={() => props.toggleAddWidgetModal()} />
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
