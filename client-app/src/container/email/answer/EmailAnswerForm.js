import React from 'react';
import Panel from "../../../components/panel/Panel";

import EmailAnswerAttachments from "./attachments/EmailAnswerAttachments";
import EmailAnswerFormGeneral from "./general/EmailAnswerFormGeneral";

const EmailAnswerForm = ({email, emailAddresses, errors, hasLoaded, handleSubmit, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange, addAttachment}) => {

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <EmailAnswerFormGeneral
                    email={email}
                    emailAddresses={emailAddresses}
                    errors={errors}
                    hasLoaded={hasLoaded}
                    handleSubmit={handleSubmit}
                    handleToIds={handleToIds}
                    handleCcIds={handleCcIds}
                    handleBccIds={handleBccIds}
                    handleInputChange={handleInputChange}
                    handleTextChange={handleTextChange}
                />

                <EmailAnswerAttachments attachments={email.attachments} addAttachment={addAttachment} />

            </Panel>
        </form>
    );
};

export default EmailAnswerForm;
