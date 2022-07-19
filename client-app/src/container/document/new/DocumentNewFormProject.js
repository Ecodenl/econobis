import React from 'react';

import DocumentNewFormProjectGeneral from './general/DocumentNewFormProjectGeneral';
import PanelFooter from '../../../components/panel/PanelFooter';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonText from '../../../components/button/ButtonText';
import DocumentNewFormCreateDocument from './create-document/DocumentNewFormCreateDocument';
import DocumentNewFormUpload from './upload/DocumentNewFormUpload';

const DocumentNewFormProject = ({
    document,
    projects,
    templates,
    errors,
    errorMessage,
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
                    <DocumentNewFormProjectGeneral
                        document={document}
                        projects={projects}
                        errors={errors}
                        errorMessage={errorMessage}
                        handleInputChange={handleInputChange}
                    />
                    {document.documentType === 'internal' ? (
                        <DocumentNewFormCreateDocument
                            document={document}
                            errors={errors}
                            errorMessage={errorMessage}
                            handleInputChange={handleInputChange}
                            templates={templates}
                            handleDocumentGroupChange={handleDocumentGroupChange}
                        />
                    ) : (
                        <DocumentNewFormUpload
                            document={document}
                            errors={errors}
                            errorMessage={errorMessage}
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

export default DocumentNewFormProject;
