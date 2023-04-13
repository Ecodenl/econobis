import React, { useState, useEffect } from 'react';

import PanelBody from '../../../../components/panel/PanelBody';
import InputTinyMCEUpdateable from '../../../../components/form/InputTinyMCEUpdateable';
import * as PropTypes from 'prop-types';
import EmailAddressAPI from '../../../../api/contact/EmailAddressAPI';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';
import InputReactSelectLong from '../../../../components/form/InputReactSelectLong';

function EmailAnswerFormGeneral(props) {
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);
    const [valueSelectedTo, setValueSelectedTo] = useState([]);
    const [valueSelectedCc, setValueSelectedCc] = useState([]);
    const [valueSelectedBcc, setValueSelectedBcc] = useState([]);
    const [selectedToMoreThanOne, setSelectedToMoreThanOne] = useState(false);
    const [includesEmailAddress, setIncludesEmailAddress] = useState(false);

    let {
        email,
        emailAddressesToSelected,
        emailAddressesCcSelected,
        emailAddressesBccSelected,
        mailboxAddresses,
        errors,
        hasLoaded,
        handleToIds,
        handleCcIds,
        handleBccIds,
        handleInputChange,
        emailTemplates,
        handleEmailTemplates,
        handleFromIds,
    } = props;
    const { mailboxId, to, cc, bcc, subject, emailTemplateId } = email;
    const initialHtmlBody = email.htmlBody;
    const [htmlBody, setValueHtmlBody] = useState(htmlBody ?? '');

    useEffect(() => setValueHtmlBody(htmlBody ?? ''), [htmlBody]);

    useEffect(() => {
        setValueSelectedTo(getSelectedTo());
    }, [to]);
    useEffect(() => {
        setValueSelectedCc(getSelectedCc());
    }, [cc]);
    useEffect(() => {
        setValueSelectedBcc(getSelectedBcc());
    }, [bcc]);

    function getSelectedTo() {
        let toArray = [];

        if (!Array.isArray(to)) {
            toArray = to.split(',');
        } else {
            toArray = to;
        }
        let selectedTo = [];
        let hasEmailAddress = false;
        toArray.map(item => {
            if (item && item.includes('@')) {
                hasEmailAddress = true;
                selectedTo.push({
                    id: item,
                    name: item,
                    email: item,
                });
            }
            if (item && !isNaN(item)) {
                let emailaddress = emailAddressesToSelected.find(emailAddress => emailAddress.id === Number(item));

                selectedTo.push(emailaddress);
            }
        });
        setIncludesEmailAddress(hasEmailAddress);

        if ((selectedTo + '').split(',').length > 1) {
            setSelectedToMoreThanOne(true);
        } else {
            setSelectedToMoreThanOne(false);
        }
        return selectedTo;
    }

    function getSelectedCc() {
        let ccArray = [];
        if (!Array.isArray(cc)) {
            ccArray = cc.split(',');
        } else {
            ccArray = cc;
        }
        let selectedCc = [];
        ccArray.map(item => {
            if (item && item.includes('@')) {
                selectedCc.push({
                    id: item,
                    name: item,
                    email: item,
                });
            }
            if (item && !isNaN(item)) {
                let emailaddress = emailAddressesCcSelected.find(emailAddress => emailAddress.id === Number(item));

                selectedCc.push(emailaddress);
            }
        });
        return selectedCc;
    }

    function getSelectedBcc() {
        let bccArray = [];
        if (!Array.isArray(bcc)) {
            bccArray = bcc.split(',');
        } else {
            bccArray = bcc;
        }
        let selectedBcc = [];
        bccArray.map(item => {
            if (item && item.includes('@')) {
                selectedBcc.push({
                    id: item,
                    name: item,
                    email: item,
                });
            }
            if (item && !isNaN(item)) {
                let emailaddress = emailAddressesBccSelected.find(emailAddress => emailAddress.id === Number(item));

                selectedBcc.push(emailaddress);
            }
        });
        return selectedBcc;
    }

    const getContactOptions = async () => {
        if (searchTermContact.length <= 1) return;

        setLoadingContact(true);

        try {
            const results = await EmailAddressAPI.fetchEmailAddressessSearch(searchTermContact);
            setLoadingContact(false);
            return results.data;
        } catch (error) {
            setLoadingContact(false);

            console.log(error);
        }
    };

    function handleInputSearchChange(value) {
        setSearchTermContact(value);
    }

    return (
        <PanelBody>
            <div className="row">
                <InputReactSelectLong
                    label="Van selecteren"
                    name={'mailboxId'}
                    value={mailboxId}
                    options={mailboxAddresses}
                    optionName={'email'}
                    onChangeAction={handleFromIds}
                    required={'required'}
                    error={errors.mailboxId}
                />
            </div>
            <div className="row">
                <AsyncSelectSet
                    label={
                        <span>
                            Aan selecteren
                            {selectedToMoreThanOne ? (
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
                            ) : includesEmailAddress ? (
                                <React.Fragment>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Geen contact geselecteerd, maar "los" emailadres ingevuld.
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
                    value={valueSelectedTo}
                    loadOptions={getContactOptions}
                    optionName={'name'}
                    onChangeAction={handleToIds}
                    allowCreate={true}
                    required={'required'}
                    error={errors.to}
                    isLoading={isLoadingContact}
                    handleInputChange={handleInputSearchChange}
                />
            </div>
            <div className="row">
                <AsyncSelectSet
                    label="Cc selecteren"
                    name={'cc'}
                    value={valueSelectedCc}
                    loadOptions={getContactOptions}
                    optionName={'name'}
                    onChangeAction={handleCcIds}
                    allowCreate={true}
                    error={errors.cc}
                    isLoading={isLoadingContact}
                    handleInputChange={handleInputSearchChange}
                />
            </div>
            <div className="row">
                <AsyncSelectSet
                    label="Bcc selecteren"
                    name={'bcc'}
                    value={valueSelectedBcc}
                    loadOptions={getContactOptions}
                    optionName={'name'}
                    onChangeAction={handleBccIds}
                    allowCreate={true}
                    error={errors.bcc}
                    isLoading={isLoadingContact}
                    handleInputChange={handleInputSearchChange}
                />
            </div>

            <div className="row">
                <InputReactSelectLong
                    label="Template"
                    name={'emailTemplateId'}
                    value={emailTemplateId}
                    options={emailTemplates}
                    onChangeAction={handleEmailTemplates}
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
                        {hasLoaded && (
                            <InputTinyMCEUpdateable
                                label={'Tekst'}
                                initialValue={initialHtmlBody}
                                value={htmlBody}
                                onChangeAction={(newValueHtmlBody, editor) => setValueHtmlBody(newValueHtmlBody)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </PanelBody>
    );
}

EmailAnswerFormGeneral.propTypes = {
    email: PropTypes.any,
    emailAddressesToSelected: PropTypes.any,
    emailAddressesCcSelected: PropTypes.any,
    emailAddressesBccSelected: PropTypes.any,
    mailboxAddresses: PropTypes.any,
    errors: PropTypes.any,
    hasLoaded: PropTypes.any,
    handleToIds: PropTypes.any,
    handleCcIds: PropTypes.any,
    handleBccIds: PropTypes.any,
    handleInputChange: PropTypes.any,
    emailTemplates: PropTypes.any,
    handleEmailTemplates: PropTypes.any,
    handleFromIds: PropTypes.any,
};

export default EmailAnswerFormGeneral;
