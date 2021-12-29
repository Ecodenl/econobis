import React from 'react';
import { connect } from 'react-redux';

import PanelFooter from '../../../../components/panel/PanelFooter';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ButtonText from '../../../../components/button/ButtonText';
import DocumentNewFormCreateDocument from '../create-document/DocumentNewFormCreateDocument';
import DocumentNewFormUpload from '../upload/DocumentNewFormUpload';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';

const DocumentNewForm = ({
    documentTypes,
    document,
    projects,
    templates,
    campaigns,
    measures,
    errors,
    handleSubmit,
    handleInputChange,
    handleDocumentGroupChange,
    onDropAccepted,
    onDropRejected,
}) => {
    const submitText = document.documentType === 'internal' ? 'Maak document' : 'Upload document';
    const { documentType, description, projectId, showOnPortal } = document;
    const documentTypeName = documentTypes.find(item => {
        return item.id == documentType;
    }).name;
    // const documentTypeName = '';

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <InputSelect
                            label="Project"
                            name={'projectId'}
                            value={projectId}
                            options={projects}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.docLinkedAtAny}
                        />
                        <InputText label="Type" name={'documentTypeName'} value={documentTypeName} readOnly={true} />
                    </div>

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
                            measures={measures}
                            campaigns={campaigns}
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

const mapStateToProps = state => {
    return {
        documentTypes: state.systemData.documentTypes,
    };
};

export default connect(mapStateToProps, null)(DocumentNewForm);
