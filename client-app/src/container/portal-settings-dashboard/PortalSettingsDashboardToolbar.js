import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const PortalSettingsDashboardToolbarWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsDashboardToolbar {...props} navigate={navigate} />;
};

class PortalSettingsDashboardToolbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
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

export default PortalSettingsDashboardToolbarWrapper;
