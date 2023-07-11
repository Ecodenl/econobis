import React from 'react';
import { connect } from 'react-redux';

import EmailDetailsAttachmentsItem from './EmailDetailsAttachmentsItem';

const EmailDetailsAttachmentsList = props => {
    let { attachments = [] } = props.email;

    attachments = attachments.filter(a => !a.cid);

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-12">Bestand</div>
            </div>
            {attachments.length > 0 ? (
                attachments.map(attachment => {
                    return <EmailDetailsAttachmentsItem key={attachment.id} attachment={attachment} />;
                })
            ) : (
                <div>Geen bijlagen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        email: state.email,
    };
};
export default connect(mapStateToProps)(EmailDetailsAttachmentsList);
