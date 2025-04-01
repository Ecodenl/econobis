import React from 'react';

import DocumentNewFormGeneral from './general/DocumentNewFormGeneral';
import PanelFooter from '../../../components/panel/PanelFooter';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonText from '../../../components/button/ButtonText';
import DocumentNewFormCreateDocument from './create-document/DocumentNewFormCreateDocument';
import DocumentNewFormUpload from './upload/DocumentNewFormUpload';

const DocumentNewForm = ({
    document,
    projects,
    participants,
    orders,
    contactGroups,
    templates,
    intakes,
    opportunities,
    campaigns,
    housingFiles,
    quotationRequests,
    measures,
    tasks,
    errors,
    errorMessage,
    handleSubmit,
    handleDocumentGroupChange,
    handleInputChange,
    handleTextChange,
    handleProjectChange,
    handleDocumentTemplateChange,
    onDropAccepted,
    onDropRejected,
    handleInputChangeContactId,
    searchTermContact,
    isLoadingContact,
    setSearchTermContact,
    setLoadingContact,
}) => {
    const submitText = document.documentType === 'internal' ? 'Maak document' : 'Upload document';

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <DocumentNewFormGeneral
                        tasks={tasks}
                        quotationRequests={quotationRequests}
                        housingFiles={housingFiles}
                        document={document}
                        contactGroups={contactGroups}
                        intakes={intakes}
                        opportunities={opportunities}
                        projects={projects}
                        participants={participants}
                        orders={orders}
                        measures={measures}
                        campaigns={campaigns}
                        errors={errors}
                        errorMessage={errorMessage}
                        handleInputChange={handleInputChange}
                        handleProjectChange={handleProjectChange}
                        handleInputChangeContactId={handleInputChangeContactId}
                        searchTermContact={searchTermContact}
                        isLoadingContact={isLoadingContact}
                        setSearchTermContact={setSearchTermContact}
                        setLoadingContact={setLoadingContact}
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

export default DocumentNewForm;
