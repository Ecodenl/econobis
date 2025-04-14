import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import fileDownload from 'js-file-download';
import Icon from 'react-icons-kit';
import { download } from 'react-icons-kit/fa/download';
import { trash } from 'react-icons-kit/fa/trash';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const DocumentsListItemWrapper = props => {
    const navigate = useNavigate();
    return <DocumentsListItem {...props} navigate={navigate} />;
};

class DocumentsListItem extends Component {
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
        this.props.navigate(`document/${id}`);
    }

    download(id) {
        DocumentDetailsAPI.download(id).then(payload => {
            fileDownload(payload.data, this.props.filename);
        });
    }

    render() {
        const {
            id,
            number,
            createdAt,
            filename,
            contact,
            documentCreatedFromName,
            documentType,
            documentGroup,
        } = this.props;
        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{number}</td>
                <td>{createdAt ? moment(createdAt).format('DD-MM-Y') : 'Onbekend'}</td>
                <td>{filename}</td>
                <td>{contact && contact.fullName}</td>
                <td>{documentCreatedFromName}</td>
                <td>{documentType}</td>
                <td>{documentGroup}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && filename.toLowerCase().endsWith('.pdf') ? (
                        <a role="button" onClick={() => this.props.navigate(`/document/inzien/${id}`)}>
                            <Icon className="mybtn-success" size={14} icon={eye} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.download(id)}>
                            <Icon className="mybtn-success" size={14} icon={download} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.createDocument ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, filename)}>
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

export default connect(mapStateToProps)(DocumentsListItemWrapper);
