import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import EmailDetailsAPI from '../../../../api/email/EmailAPI';
import Modal from '../../../../components/modal/Modal';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import { hashHistory } from 'react-router';

class EmailDetailsAttachmentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
            item: '',
            showViewDocument: false,
        };
    }

    downloadItem = (id, name) => {
        EmailDetailsAPI.downloadAttachment(id).then(payload => {
            fileDownload(payload.data, name);
        });
    };

    viewItem = (id, name) => {
        EmailDetailsAPI.downloadAttachment(id).then(payload => {
            let item = '';

            if (name.toLowerCase().endsWith('.pdf')) {
                item = payload.data;
            } else {
                item = URL.createObjectURL(payload.data);
            }

            this.setState(
                {
                    item: item,
                },
                () => this.showViewDocument()
            );
        });
    };

    showViewDocument = () => {
        this.setState({
            showViewDocument: !this.state.showViewDocument,
        });
    };

    saveToAlfresco = id => {
        hashHistory.push(`document/nieuw/upload/email-bijlage/${id}`);
    };

    render() {
        const { id, name } = this.props.attachment;

        let hasValidExtension = false;
        if (
            name.toLowerCase().endsWith('.pdf') ||
            name.toLowerCase().endsWith('.jpg') ||
            name.toLowerCase().endsWith('.png')
        ) {
            hasValidExtension = true;
        }
        return (
            <div
                className={`row border ${this.props.highlightLine}`}
                onMouseEnter={() => this.props.onLineEnter()}
                onMouseLeave={() => this.props.onLineLeave()}
            >
                <div className="col-sm-11">{name}</div>
                <div className="col-sm-1">
                    {this.props.showActionButtons ? (
                        <a role="button" onClick={() => this.downloadItem(id, name)}>
                            <span className="glyphicon glyphicon-open-file mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.props.showActionButtons ? (
                        <a role="button" onClick={() => this.saveToAlfresco(id)}>
                            <span className="glyphicon glyphicon-share mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.props.showActionButtons && hasValidExtension ? (
                        <a role="button" onClick={() => this.viewItem(id, name)}>
                            <span className="glyphicon glyphicon-eye-open mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </div>
                {this.state.showViewDocument && name.toLowerCase().endsWith('.pdf') && (
                    <Modal
                        closeModal={this.showViewDocument}
                        modalClassName="modal-lg"
                        modalMainClassName="email-attachment-modal "
                        showConfirmAction={false}
                        buttonCancelText="Ok"
                    >
                        <PdfViewer file={this.state.item} />
                    </Modal>
                )}
                {this.state.showViewDocument &&
                    (name.toLowerCase().endsWith('.png') || name.toLowerCase().endsWith('.jpg')) && (
                        <Modal
                            closeModal={this.showViewDocument}
                            modalClassName="modal-lg"
                            modalMainClassName="email-attachment-modal "
                            showConfirmAction={false}
                            buttonCancelText="Ok"
                        >
                            <img className={'img-responsive'} src={this.state.item} alt={name} />
                        </Modal>
                    )}
            </div>
        );
    }
}

export default EmailDetailsAttachmentView;
