import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../../components/form/InputSelect';

const DocumentNewFormCreateDocument = ({
    document,
    templates,
    errors,
    handleInputChange,
    handleDocumentGroupChange,
    documentGroups,
    users,
}) => {
    const { documentGroup, templateId, freeText1, freeText2, filename, sentById } = document;

    return (
        <div>
            <div className="row">
                <InputSelect
                    label="Documentgroep"
                    name={'documentGroup'}
                    value={documentGroup}
                    options={documentGroups}
                    onChangeAction={handleDocumentGroupChange}
                    required={'required'}
                    error={errors.documentGroup}
                />
                <InputSelect
                    label="Template"
                    name={'templateId'}
                    value={templateId}
                    options={templates}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.templateId}
                />
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
            <div className="row">
                <InputSelect
                    label="Afzender"
                    name={'sentById'}
                    value={sentById}
                    options={users}
                    optionName={'fullName'}
                    onChangeAction={handleInputChange}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentGroups: state.systemData.documentGroups,
        users: state.systemData.users,
    };
};

export default connect(
    mapStateToProps,
    null
)(DocumentNewFormCreateDocument);
