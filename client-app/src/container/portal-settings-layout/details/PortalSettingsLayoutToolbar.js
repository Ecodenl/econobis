import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import * as PropTypes from 'prop-types';
import PortalSettingsLayoutDeleteItem from './PortalSettingsLayoutDeleteItem';

// Functionele wrapper voor de class component
const PortalSettingsLayoutDetailsToolbarWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsLayoutDetailsToolbar {...props} navigate={navigate} />;
};

class PortalSettingsLayoutDetailsToolbar extends Component {
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
        let { description, id, isDefault, permissions } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        {!isDefault && permissions.managePortalSettings && (
                            <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Portal instellingen layout: {description}</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <PortalSettingsLayoutDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        description={description}
                        id={id}
                        deletePortalSettingsLayout={this.props.deletePortalSettingsLayout}
                    />
                )}
            </div>
        );
    }
}

PortalSettingsLayoutDetailsToolbar.propTypes = { description: PropTypes.any };

export default PortalSettingsLayoutDetailsToolbarWrapper;
