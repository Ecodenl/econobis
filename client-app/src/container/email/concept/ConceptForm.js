import React from 'react';
import Panel from '../../../components/panel/Panel';

import ConceptAttachments from './attachments/ConceptAttachments';
import ConceptFormGeneral from './general/ConceptFormGeneral';

const ConceptNewForm = ({
    email,
    contactGroupName,
    emailAddresses,
    errors,
    hasLoaded,
    handleSubmit,
    handleToIds,
    handleCcIds,
    handleBccIds,
    handleInputChange,
    handleTextChange,
    addAttachment,
    deleteAttachment,
}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <ConceptFormGeneral
                    email={email}
                    contactGroupName={contactGroupName}
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

                <ConceptAttachments
                    attachments={email.attachments}
                    deleteAttachment={deleteAttachment}
                    addAttachment={addAttachment}
                />
            </Panel>
        </form>
    );
};

export default ConceptNewForm;
