import React from 'react';

import EmailAttachmentsItem from "./EmailAttachmentsItem";

const EmailAttachmentsList = ({attachments, deleteAttachment}) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Bestand</div>
                <div className="col-sm-1"></div>
            </div>
            {
                attachments.length > 0 ?
                    attachments.map(attachment => {
                        return <EmailAttachmentsItem
                            key={attachment.name}
                            attachment={attachment}
                            deleteAttachment={deleteAttachment}
                        />;
                    })
                    :
                    <div>Geen bijlagen bekend</div>
            }
        </div>
    );
};

export default EmailAttachmentsList;

