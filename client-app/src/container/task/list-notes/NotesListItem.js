import React, { Component } from 'react';
import { connect } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

// Functionele wrapper voor de class component
const NotesListItemWrapper = props => {
    const navigate = useNavigate();
    return <NotesListItem {...props} navigate={navigate} />;
};

class NotesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };

        this.openItem = this.openItem.bind(this);
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

    openItem() {
        this.props.navigate(`/taak/${this.props.id}`);
    }

    render() {
        const { id, createdAt, typeName, noteSummary, contactFullName, datePlannedStart, responsibleName } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{moment(createdAt).format('L')}</td>
                <td>{typeName}</td>
                <td>{noteSummary}</td>
                <td>{contactFullName}</td>
                <td>{datePlannedStart && moment(datePlannedStart).format('L')}</td>
                <td>{responsibleName}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={this.openItem}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageNote ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
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

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

export default connect(mapStateToProps, null)(NotesListItemWrapper);
