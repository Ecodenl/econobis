import React, {useState} from 'react';
import Icon from "react-icons-kit";
import EmailDetailsAPI from "../../../api/email/EmailAPI";
import fileDownload from "js-file-download";
import {fileO} from 'react-icons-kit/fa/fileO';
import {share} from 'react-icons-kit/fa/share';
import {eye} from 'react-icons-kit/fa/eye';
import {hashHistory} from "react-router";
import Modal from '../../../components/modal/Modal';
import PdfViewer from '../../../components/pdf/PdfViewer';

export default function EmailSplitViewDetailsAttachmentsPanel({email}) {
    const [hoveredAttachmentId, setHoveredAttachmentId] = useState(null);
    const [viewedAttachment, setViewedAttachment] = useState(null);

    const downloadItem = (attachment) => {
        EmailDetailsAPI.downloadAttachment(attachment.id).then(payload => {
            fileDownload(payload.data, attachment.name);
        });
    };

    const saveToAlfresco = attachment => {
        hashHistory.push(`document/nieuw/upload/email-bijlage/${attachment.id}`);
    };

    const isImage = (attachment) => {
        return attachment.name.toLowerCase().endsWith('.jpg')
            || attachment.name.toLowerCase().endsWith('.png');
    }

    const isPdf = (attachment) => {
        return attachment.name.toLowerCase().endsWith('.pdf');
    }

    const viewItem = (attachment) => {
        EmailDetailsAPI.downloadAttachment(attachment.id).then(payload => {
            let item = isPdf(attachment) ? payload.data : URL.createObjectURL(payload.data);
            setViewedAttachment({
                ...attachment,
                item: item,
            })
        });
    };

    return (
        <div className="panel panel-default ">
            <div className="panel-heading ">
                <span className="h5 text-bold">Bijlagen</span>
            </div>
            <div className="panel-body ">
                <div className="col-md-12">
                    <div className="row border header">
                        <div className="col-sm-12">Bestand</div>
                    </div>
                    {email.attachments.length > 0 ? (
                        email.attachments.filter(a => a.cid === null).map(attachment => {
                            return (
                                <div
                                    className={`row border ${hoveredAttachmentId === attachment.id ? 'highlight-line' : ''}`}
                                    onMouseEnter={() => setHoveredAttachmentId(attachment.id)}
                                    onMouseLeave={() => setHoveredAttachmentId(null)}
                                >
                                    <div className="col-sm-10">{attachment.name}</div>
                                    <div className="col-sm-2">
                                        {hoveredAttachmentId === attachment.id && (
                                            <>
                                                <a role="button" onClick={() => downloadItem(attachment)}>
                                                    <Icon className="mybtn-success" size={14} icon={fileO}/>
                                                </a>
                                                <a role="button" onClick={() => saveToAlfresco(attachment)}>
                                                    <Icon className="mybtn-success" size={14} icon={share}/>
                                                </a>
                                                {(isImage(attachment) || isPdf(attachment)) && (
                                                    <a role="button" onClick={() => viewItem(attachment)}>
                                                        <Icon className="mybtn-success" size={14} icon={eye}/>
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div>Geen bijlagen bekend.</div>
                    )}
                </div>
            </div>

            {viewedAttachment && (
                <Modal
                    closeModal={() => setViewedAttachment(null)}
                    modalClassName="modal-lg"
                    modalMainClassName="email-attachment-modal "
                    showConfirmAction={false}
                    buttonCancelText="Ok"
                >
                    <div style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                        {
                            isPdf(viewedAttachment) ? (
                                <PdfViewer file={viewedAttachment.item}/>
                            ) : (
                                <img className={'img-responsive'} src={viewedAttachment.item} alt={name}/>
                            )
                        }
                    </div>
                </Modal>
            )}
        </div>
    );
}

