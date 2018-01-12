import React from 'react';

import EmailAttachments from "./attachments/EmailAttachments";
import EmailNewFormGeneral from "./general/EmailNewFormGeneral";

const EmailNewForm = ({email ,mailboxAddresses, emailAddresses, emailTemplates, errors, handleSubmit, handleFromIds, handleEmailTemplates, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange, addAttachment, deleteAttachment}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>

                <EmailNewFormGeneral
                    email={email}
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

                <EmailAttachments attachments={email.attachments} addAttachment={addAttachment} deleteAttachment={deleteAttachment} />

        </form>
    );
};

export default EmailNewForm;
