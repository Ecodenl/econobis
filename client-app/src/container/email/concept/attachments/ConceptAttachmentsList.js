import React from 'react';

import ConceptAttachmentsItem from './ConceptAttachmentsItem';

const ConceptAttachmentsList = props => {
    const { attachments } = props;

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Naam</div>
                <div className="col-sm-1" />
            </div>
            {attachments.length > 0 ? (
                attachments.map(attachment => {
                    return (
                        <ConceptAttachmentsItem
                            key={attachment.name}
                            attachment={attachment}
                            deleteAttachment={props.deleteAttachment}
                        />
                    );
                })
            ) : (
                <div>Geen bijlages bekend.</div>
            )}
        </div>
    );
};

export default ConceptAttachmentsList;
