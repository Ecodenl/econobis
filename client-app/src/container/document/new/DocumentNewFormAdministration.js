import React from 'react';

import DocumentNewFormAdministrationGeneral from './general/DocumentNewFormAdministrationGeneral';
import PanelFooter from '../../../components/panel/PanelFooter';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonText from '../../../components/button/ButtonText';
import DocumentNewFormCreateDocument from './create-document/DocumentNewFormCreateDocument';
import DocumentNewFormUpload from './upload/DocumentNewFormUpload';

const DocumentNewFormAdministration = ({
    document,
    templates,
    errors,
    errorMessage,
    handleSubmit,
    handleInputChange,
    handleTextChange,
    handleDocumentGroupChange,
    handleDocumentTemplateChange,
    onDropAccepted,
    onDropRejected,
}) => {
    const submitText = document.documentType === 'internal' ? 'Maak document' : 'Upload document';

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <DocumentNewFormAdministrationGeneral
                        document={document}
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
                            handleTextChange={handleTextChange}
                            templates={templates}
                            handleDocumentGroupChange={handleDocumentGroupChange}
                            handleDocumentTemplateChange={handleDocumentTemplateChange}
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

export default DocumentNewFormAdministration;
