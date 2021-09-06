import React from 'react';

import EmailAttachments from './attachments/EmailAttachments';
import EmailNewFormGeneral from './general/EmailNewFormGeneral';

const EmailNewForm = ({
    email,
    contactGroupName,
    mailboxAddresses,
    emailAddresses,
    emailTemplates,
    errors,
    handleSubmit,
    handleFromIds,
    handleEmailTemplates,
    handleToIds,
    handleCcIds,
    handleBccIds,
    handleInputChange,
    handleTextChange,
    addAttachment,
    addDocumentAsAttachment,
    deleteAttachment,
}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <EmailNewFormGeneral
                email={email}
                contactGroupName={contactGroupName}
                emailAddresses={emailAddresses}
                mailboxAddresses={mailboxAddresses}
                emailTemplates={emailTemplates}
                errors={errors}
                handleSubmit={handleSubmit}
                handleFromIds={handleFromIds}
                handleEmailTemplates={handleEmailTemplates}
                handleToIds={handleToIds}
                handleCcIds={handleCcIds}
                handleBccIds={handleBccIds}
                handleInputChange={handleInputChange}
                handleTextChange={handleTextChange}
            />

            <EmailAttachments
                attachments={email.attachments}
                addAttachment={addAttachment}
                addDocumentAsAttachment={addDocumentAsAttachment}
                deleteAttachment={deleteAttachment}
            />
        </form>
    );
};

export default EmailNewForm;
