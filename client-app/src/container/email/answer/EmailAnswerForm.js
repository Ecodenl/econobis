import React from 'react';
import Panel from '../../../components/panel/Panel';

import EmailAnswerAttachments from './attachments/EmailAnswerAttachments';
import EmailAnswerFormGeneral from './general/EmailAnswerFormGeneral';

const EmailAnswerForm = ({
    emailTemplates,
    mailboxAddresses,
    handleFromIds,
    handleEmailTemplates,
    email,
    emailAddressesToSelected,
    emailAddressesCcSelected,
    emailAddressesBccSelected,
    errors,
    hasLoaded,
    handleSubmit,
    handleToIds,
    handleCcIds,
    handleBccIds,
    handleInputChange,
    addAttachment,
    deleteAttachment,
}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <EmailAnswerFormGeneral
                    email={email}
                    emailAddressesToSelected={emailAddressesToSelected}
                    emailAddressesCcSelected={emailAddressesCcSelected}
                    emailAddressesBccSelected={emailAddressesBccSelected}
                    errors={errors}
                    hasLoaded={hasLoaded}
                    handleSubmit={handleSubmit}
                    handleToIds={handleToIds}
                    handleCcIds={handleCcIds}
                    handleBccIds={handleBccIds}
                    handleInputChange={handleInputChange}
                    emailTemplates={emailTemplates}
                    handleEmailTemplates={handleEmailTemplates}
                    handleFromIds={handleFromIds}
                    mailboxAddresses={mailboxAddresses}
                />

                <EmailAnswerAttachments
                    attachments={email.attachments}
                    addAttachment={addAttachment}
                    deleteAttachment={deleteAttachment}
                />
            </Panel>
        </form>
    );
};

export default EmailAnswerForm;
