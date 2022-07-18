import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';

class PortalSettingsDashboardToolbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Portal dashboard instellingen</h4>
                </div>
                <div className="col-md-4" />
            </div>
        );
    }
}

export default PortalSettingsDashboardToolbar;
