import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import PortalSettingsDashboardWidgetDeleteItem from './PortalSettingsDashboardWidgetDeleteItem';

// Functionele wrapper voor de class component
const PortalSettingsDashboardWidgetDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsDashboardWidgetDetailsToolbar {...props} navigate={navigate} />;
};

class PortalSettingsDashboardWidgetDetailsToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        let { portalSettingsDashboardWidget, permissions, navigate } = this.props;
        let { id, title, codeRef } = portalSettingsDashboardWidget;

        const staticWidgets = ['over-ons', 'project-schrijf-je-in', 'huidige-deelnames'];

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        {permissions.managePortalSettings && !staticWidgets.includes(codeRef) && (
                            <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Wijzigen dashboard widget</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <PortalSettingsDashboardWidgetDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        description={title}
                        id={id}
                        deletePortalSettingsDashboardWidget={this.props.deletePortalSettingsDashboardWidget}
                    />
                )}
            </div>
        );
    }
}

PortalSettingsDashboardWidgetDetailsToolbar.propTypes = { description: PropTypes.any };

export default PortalSettingsDashboardWidgetDetailsToolbarWrapper;
