import React from 'react';

import PanelBody from "../../../../components/panel/PanelBody";
import InputMultiSelectCreate from "../../../../components/form/InputMultiSelectCreate";
import InputMultiSelect from "../../../../components/form/InputMultiSelect";
import InputTinyMCEUpdateable from "../../../../components/form/InputTinyMCEUpdateable";

const EmailAnswerFormGeneral = ({email, emailAddresses, errors, hasLoaded, handleToIds, handleCcIds, handleBccIds, handleInputChange,
                                    handleTextChange, emailTemplates, handleEmailTemplates}) => {
    const { from, to, cc, bcc, subject, htmlBody, emailTemplateId } = email;

    return (
            <PanelBody>
                <div className="row">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">Van</label>
                        </div>
                        <div className="col-sm-9" id="from">
                            {from}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label="Aan selecteren"
                        name={"to"}
                        value={to}
                        options={emailAddresses}
                        optionName={"name"}
                        onChangeAction={handleToIds}
                        allowCreate={true}
                        required={"required"}
                        error={errors.to}
                    />
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label="Cc selecteren"
                        name={"cc"}
                        value={cc}
                        options={emailAddresses}
                        optionName={"name"}
                        onChangeAction={handleCcIds}
                        error={errors.to}
                    />
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label="Bcc selecteren"
                        name={"bcc"}
                        value={bcc}
                        options={emailAddresses}
                        optionName={"name"}
                        onChangeAction={handleBccIds}
                        error={errors.to}
                    />
                </div>

                <div className="row">
                    <InputMultiSelect
                        label="Template"
                        name={"emailTemplateId"}
                        value={emailTemplateId}
                        options={emailTemplates}
                        onChangeAction={handleEmailTemplates}
                        multi={false}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Onderwerp</label>
                            </div>
                            <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        name="subject"
                                        value={subject}
                                        onChange={ handleInputChange }
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            {
                                hasLoaded &&
                                <InputTinyMCEUpdateable
                                    label={"Tekst"}
                                    value={htmlBody}
                                    onChangeAction={handleTextChange}
                                />
                            }
                        </div>
                    </div>
                </div>
            </PanelBody>
    );
};

export default EmailAnswerFormGeneral;
