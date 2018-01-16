import React from 'react';
import fileDownload from "js-file-download";
import EmailDetailsAPI from "../../../../api/email/EmailAPI";

const EmailDetailsAttachmentView = props => {
    const {id, name} = props.attachment;

    const downloadItem = (id, name) => {
        EmailDetailsAPI.downloadAttachment(id).then((payload) => {
            fileDownload(payload.data, name);
        });
    };

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={() => downloadItem(id, name)} className="col-sm-12" >{name}</div>
        </div>
    );
};

export default EmailDetailsAttachmentView;
