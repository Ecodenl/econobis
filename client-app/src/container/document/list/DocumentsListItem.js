import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import fileDownload from "js-file-download";
import EmailDetailsAPI from "../../../api/email/EmailAPI";

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
        hashHistory.push(`document/${id}`);
    }

    download(id) {
        DocumentDetailsAPI.download(id).then((payload) => {
            fileDownload(payload.data, this.props.filename);
        });
    }

    render() {
        const { id, number, createdAt, filename, contact, documentType, documentGroup} = this.props;
        return (
          <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
              <td>{ number }</td>
              <td>{ createdAt ? moment(createdAt.date).format('DD-MM-Y') : 'Onbekend'}</td>
              <td>{ filename }</td>
              <td>{ contact && contact.fullName }</td>
              <td>{ documentType }</td>
              <td>{ documentGroup }</td>
              <td>
                  {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons && filename.endsWith('.pdf') ? <a role="button" onClick={() => hashHistory.push(`/document/inzien/${id}`)}><span className="glyphicon glyphicon-eye-open mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons ? <a role="button" onClick={() => this.download(id)}><span className="glyphicon glyphicon-open-file mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons && this.props.permissions.createDocument ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, filename)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
              </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    }
};

export default connect(mapStateToProps)(DocumentsListItem);