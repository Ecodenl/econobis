import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');

// Functionele wrapper voor de class component
const DocumentTemplatesItemWrapper = props => {
    const navigate = useNavigate();
    return <DocumentTemplatesItem {...props} navigate={navigate} />;
};

class DocumentTemplatesItem extends Component {
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
        this.props.navigate(`/document-template/${id}`);
    }

    render() {
        const { id, number, createdAt, name, documentGroup, active } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{name}</td>
                <td>{documentGroup ? documentGroup.name : 'Onbekend'}</td>
                <td>{createdAt ? moment(createdAt).format('L') : 'Onbekend'}</td>
                <td>{active ? 'Ja' : 'Nee'}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons && this.props.permissions.createDocumentTemplate && false ? (
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(DocumentTemplatesItemWrapper);
