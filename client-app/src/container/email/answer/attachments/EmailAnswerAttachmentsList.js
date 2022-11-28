import React from 'react';

import EmailAnswerAttachmentsItem from './EmailAnswerAttachmentsItem';

const EmailAnswerAttachmentsList = props => {
    let { attachments, deleteAttachment } = props;

    attachments = attachments.filter(a => !a.cid);

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Naam</div>
                <div className="col-sm-1" />
            </div>
            {attachments.length > 0 ? (
                attachments.map(attachment => {
                    return (
                        <EmailAnswerAttachmentsItem
                            key={attachment.name}
                            attachment={attachment}
                            deleteAttachment={deleteAttachment}
                        />
                    );
                })
            ) : (
                <div>Geen bijlages bekend.</div>
            )}
        </div>
    );
};

export default EmailAnswerAttachmentsList;
