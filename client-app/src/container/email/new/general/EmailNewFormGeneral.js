import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';
import InputMultiSelectCreate from '../../../../components/form/InputMultiSelectCreate';

import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputTinyMCEUpdateable from '../../../../components/form/InputTinyMCEUpdateable';

const EmailNewFormGeneral = ({
    email,
    emailAddresses,
    mailboxAddresses,
    emailTemplates,
    errors,
    handleFromIds,
    handleToIds,
    handleEmailTemplates,
    handleCcIds,
    handleBccIds,
    handleInputChange,
    handleTextChange,
}) => {
    const { from, to, cc, bcc, subject, htmlBody, emailTemplateId } = email;

    return (
        <Panel>
            <PanelBody>
                <div className="row">
                    <InputMultiSelect
                        label="Van selecteren"
                        name={'from'}
                        value={from}
                        options={mailboxAddresses}
                        optionName={'email'}
                        onChangeAction={handleFromIds}
                        required={'required'}
                        error={errors.from}
                        multi={false}
                    />
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label={
                            <span>
                                Aan selecteren
                                {to.split(',').length > 1 ? (
                                    <React.Fragment>
                                        <br />
                                        <small style={{ color: 'red', fontWeight: 'normal' }}>
                                            Meer dan 1 geselecteerd.
                                        </small>
                                        <br />
                                        <small style={{ color: 'red', fontWeight: 'normal' }}>
                                            Samenvoegvelden contact niet mogelijk.
                                        </small>
                                    </React.Fragment>
                                ) : (
                                    ''
                                )}
                            </span>
                        }
                        name={'to'}
                        value={to}
                        options={emailAddresses}
                        optionName={'name'}
                        onChangeAction={handleToIds}
                        allowCreate={true}
                        required={'required'}
                        error={errors.to}
                    />
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label="Cc selecteren"
                        name={'cc'}
                        value={cc}
                        options={emailAddresses}
                        optionName={'name'}
                        onChangeAction={handleCcIds}
                    />
                </div>
                <div className="row">
                    <InputMultiSelectCreate
                        label="Bcc selecteren"
                        name={'bcc'}
                        value={bcc}
                        options={emailAddresses}
                        optionName={'name'}
                        onChangeAction={handleBccIds}
                    />
                </div>
                <div className="row">
                    <InputMultiSelect
                        label="Template"
                        name={'emailTemplateId'}
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
                                <label className="col-sm-12 required">Onderwerp</label>
                            </div>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className={`form-control input-sm ${errors.subject ? 'has-error' : ''}`}
                                    name="subject"
                                    value={subject}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <InputTinyMCEUpdateable
                                label={'Tekst'}
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
