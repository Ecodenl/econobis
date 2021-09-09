import React from 'react';

import PanelBody from '../../../../components/panel/PanelBody';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputText from '../../../../components/form/InputText';

const ConceptFormGeneral = ({
    email,
    contactGroupName,
    emailAddresses,
    errors,
    hasLoaded,
    handleSubmit,
    handleToIds,
    handleCcIds,
    handleBccIds,
    handleInputChange,
    handleTextChange,
}) => {
    const { from, to, cc, bcc, subject, htmlBody, contactGroupId } = email;

    return (
        <PanelBody>
            <div className="row">
                <div className="row margin-10-bottom">
                    <div className="col-sm-3">
                        <label htmlFor="description" className="col-sm-12">
                            Van
                        </label>
                    </div>
                    <div className="col-sm-9" id="from">
                        {from}
                    </div>
                </div>
            </div>
            <div className="row">
                {contactGroupId ? (
                    <InputText
                        label={
                            <span>
                                Groep
                                <br />
                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                    Contacten in groep en extra contacten krijgen elk een aparte mail en zien niet de
                                    e-mail adressen van anderen. Samenvoegvelden werken.
                                </small>
                            </span>
                        }
                        name={'contactGroupName'}
                        value={contactGroupName}
                        readOnly={true}
                    />
                ) : (
                    <InputMultiSelect
                        label="Aan selecteren"
                        name={'to'}
                        value={to}
                        options={emailAddresses}
                        optionName={'name'}
                        onChangeAction={handleToIds}
                        allowCreate={true}
                        required={'required'}
                        error={errors.to}
                    />
                )}
            </div>
            <div className="row">
                <InputMultiSelect
                    label={contactGroupId ? 'Extra contacten' : 'Cc selecteren'}
                    name={'cc'}
                    value={cc}
                    options={emailAddresses}
                    optionName={'name'}
                    onChangeAction={handleCcIds}
                    allowCreate={true}
                />
            </div>
            {!contactGroupId ? (
                <div className="row">
                    <InputMultiSelect
                        label="Bcc selecteren"
                        name={'bcc'}
                        value={bcc}
                        options={emailAddresses}
                        optionName={'name'}
                        onChangeAction={handleBccIds}
                        allowCreate={true}
                    />
                </div>
            ) : null}
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
                        {hasLoaded && (
                            <InputTinyMCE label={'Tekst'} value={htmlBody} onChangeAction={handleTextChange} />
                        )}
                    </div>
                </div>
            </div>
        </PanelBody>
    );
};

export default ConceptFormGeneral;
