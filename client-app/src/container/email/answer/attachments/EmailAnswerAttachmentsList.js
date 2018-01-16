import React from 'react';

import EmailAnswerAttachmentsItem from "./EmailAnswerAttachmentsItem";
import EmailAnswerFormGeneral from "../general/EmailAnswerFormGeneral";

const EmailAnswerAttachmentsList = props => {
    const { attachments } = props;

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Naam</div>
                <div className="col-sm-1"></div>
            </div>
            {
                attachments.length > 0 ?
                    attachments.map(attachment => {
                        return <EmailAnswerAttachmentsItem
                            key={attachment.name}
                            attachment={attachment}
                        />;
                    })
                    :
                    <div>Geen bijlages bekend</div>
            }
        </div>
    );
};

export default EmailAnswerAttachmentsList;

