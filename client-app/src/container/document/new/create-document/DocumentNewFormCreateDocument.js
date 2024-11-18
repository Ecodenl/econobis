import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';
import InputTinyMCEUpdateable from '../../../../components/form/InputTinyMCEUpdateable';
import InputReactSelectLong from '../../../../components/form/InputReactSelectLong';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';
function DocumentNewFormCreateDocument(props) {
    const [htmlBody, setValueHtmlBody] = useState('');

    let {
        document,
        templates,
        errors,
        errorMessage,
        handleInputChange,
        handleTextChange,
        handleDocumentGroupChange,
        handleDocumentTemplateChange,
        documentGroups,
    } = props;
    const { documentGroup, templateId, allowChangeHtmlBody, initialHtmlBody, freeText1, freeText2 } = document;

    useEffect(() => {
        handleTextChange(htmlBody);
    }, [htmlBody]);

    return (
        <>
            <div className="row">
                <InputReactSelectLong
                    label="Documentgroep"
                    name={'documentGroup'}
                    value={documentGroup}
                    options={documentGroups}
                    onChangeAction={handleDocumentGroupChange}
                    required={'required'}
                    error={errors.documentGroup}
                    errorMessage={errorMessage.documentGroup}
                />
            </div>
            <div className="row">
                <InputReactSelectLong
                    label={'Template'}
                    name={'templateId'}
                    value={templateId}
                    options={templates}
                    onChangeAction={handleDocumentTemplateChange}
                    required={'required'}
                    error={errors.templateId}
                    errorMessage={errorMessage.templateId}
                />
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        {allowChangeHtmlBody ? (
                            <InputTinyMCEUpdateable
                                label={'Template inhoud'}
                                initialValue={initialHtmlBody}
                                value={htmlBody != '' ? htmlBody : initialHtmlBody}
                                onChangeAction={(newValueHtmlBody, editor) => setValueHtmlBody(newValueHtmlBody)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Tekst veld 1</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control input-sm"
                                name="freeText1"
                                value={freeText1}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Tekst veld 2</label>
                        </div>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control input-sm"
                                name="freeText2"
                                value={freeText2}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        documentGroups: state.systemData.documentGroups,
    };
};

export default connect(mapStateToProps, null)(DocumentNewFormCreateDocument);
