import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { eye } from 'react-icons-kit/fa/eye';

// Functionele wrapper voor de class component
const EmailTemplatesItemWrapper = props => {
    const navigate = useNavigate();
    return <EmailTemplatesItem {...props} navigate={navigate} />;
};

class EmailTemplatesItem extends Component {
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
        this.props.navigate(`/email-template/${id}`);
    }

    render() {
        const { id, name, subject, createdBy, permissions } = this.props;
        const canManage = permissions && permissions.manageEmailTemplate;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{name}</td>
                <td>{subject}</td>
                <td>{createdBy ? createdBy.fullName : ''}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a
                            role="button"
                            onClick={() => this.openItem(id)}
                            title={canManage ? 'Openen en wijzigen' : 'Bekijken'}
                        >
                            <Icon className="mybtn-success" size={14} icon={canManage ? pencil : eye} />
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

export default connect(mapStateToProps)(EmailTemplatesItemWrapper);
