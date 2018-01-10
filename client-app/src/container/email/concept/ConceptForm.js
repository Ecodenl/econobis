import React from 'react';
import Panel from "../../../components/panel/Panel";

import ConceptAttachments from "./attachments/ConceptAttachments";
import ConceptFormGeneral from "./general/ConceptFormGeneral";

const ConceptNewForm = ({email, emailAddresses, errors, hasLoaded, handleSubmit, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange, onDrop}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <ConceptFormGeneral
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

                <ConceptAttachments attachments={email.attachments} onDrop={onDrop} />

            </Panel>
        </form>
    );
};

export default ConceptNewForm;
