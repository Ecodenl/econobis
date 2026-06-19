import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

// Functionele wrapper voor de class component
const PortalSettingsLayoutListItemWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsLayoutListItem {...props} navigate={navigate} />;
};

class PortalSettingsLayoutListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        this.props.navigate(`/portal-instellingen-layout/${id}`);
    }

    render() {
        const { id, description, isDefault, permissions } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={permissions.managePortalSettings ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{description}</td>
                <td>{isDefault ? 'Standaard' : ''}</td>
                <td>
                    {this.state.showActionButtons && permissions.managePortalSettings ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons && !isDefault && permissions.managePortalSettings ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, description)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(PortalSettingsLayoutListItemWrapper);
