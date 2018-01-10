import React from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import InputTinyMCE from "../../../../components/form/InputTinyMCE";
import InputMultiSelectCreate from "../../../../components/form/InputMultiSelectCreate";

const EmailNewFormGeneral = ({email, emailAddresses, errors, handleSubmit, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange}) => {
    const { to, cc, bcc, subject, htmlBody } = email;

    return (
        <Panel>
            <PanelBody>
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
                            <InputTinyMCE
                                label={"Tekst"}
                                value={htmlBody}
                                onChangeAction={handleTextChange}
                            />
                        </div>
                    </div>
                </div>
            </PanelBody>
        </Panel>
    );
};

export default EmailNewFormGeneral;
