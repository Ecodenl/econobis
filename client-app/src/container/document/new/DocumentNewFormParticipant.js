import React from 'react';

import DocumentNewFormParticipantGeneral from './general/DocumentNewFormParticipantGeneral';
import PanelFooter from '../../../components/panel/PanelFooter';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonText from '../../../components/button/ButtonText';
import DocumentNewFormCreateDocument from './create-document/DocumentNewFormCreateDocument';
import DocumentNewFormUpload from './upload/DocumentNewFormUpload';

const DocumentNewFormParticipant = ({
    document,
    projects,
    participants,
    templates,
    errors,
    handleSubmit,
    handleInputChange,
    handleDocumentGroupChange,
    onDropAccepted,
    onDropRejected,
}) => {
    const submitText = document.documentType === 'internal' ? 'Maak document' : 'Upload document';

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <DocumentNewFormParticipantGeneral
                        document={document}
                        projects={projects}
                        participants={participants}
                        errors={errors}
                        handleInputChange={handleInputChange}
                    />
                    {document.documentType === 'internal' ? (
                        <DocumentNewFormCreateDocument
                            document={document}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            templates={templates}
                            handleDocumentGroupChange={handleDocumentGroupChange}
                        />
                    ) : (
                        <DocumentNewFormUpload
                            document={document}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            onDropAccepted={onDropAccepted}
                            onDropRejected={onDropRejected}
                        />
                    )}

                    <PanelFooter>
                        <div className="pull-right">
                            <ButtonText
                                buttonText={submitText}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelFooter>
                </PanelBody>
            </Panel>
        </form>
    );
};

export default DocumentNewFormParticipant;
