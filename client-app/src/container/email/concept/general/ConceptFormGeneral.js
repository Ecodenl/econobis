import React, { useState, useEffect } from 'react';

import PanelBody from '../../../../components/panel/PanelBody';
import InputTinyMCEUpdateable from '../../../../components/form/InputTinyMCEUpdateable';
import * as PropTypes from 'prop-types';
import EmailAddressAPI from '../../../../api/contact/EmailAddressAPI';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';
import InputText from '../../../../components/form/InputText';

function ConceptFormGeneral(props) {
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);
    const [valueSelectedTo, setValueSelectedTo] = useState([]);
    const [valueSelectedCc, setValueSelectedCc] = useState([]);
    const [valueSelectedBcc, setValueSelectedBcc] = useState([]);
    const [htmlBody, setValueHtmlBody] = useState('');
    const [selectedToMoreThanOne, setSelectedToMoreThanOne] = useState(false);
    const [includesEmailAddress, setIncludesEmailAddress] = useState(false);

    let {
        email,
        contactGroupName,
        emailAddressesToSelected,
        emailAddressesCcSelected,
        emailAddressesBccSelected,
        errors,
        hasLoaded,
        handleToIds,
        handleCcIds,
        handleBccIds,
        handleInputChange,
        handleTextChange,
    } = props;
    const { from, to, cc, bcc, subject, initialHtmlBody, contactGroupId } = email;

    useEffect(() => {
        handleTextChange(htmlBody);
    }, [htmlBody]);

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
                                    e-mail adressen van anderen. Samenvoegvelden werken niet voor extra contacten waar
                                    alleen emailadres is toegevoegd.
                                </small>
                            </span>
                        }
                        name={'contactGroupName'}
                        value={contactGroupName}
                        readOnly={true}
                    />
                ) : (
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
                )}
            </div>
            <div className="row">
                <AsyncSelectSet
                    label={contactGroupId ? 'Extra contacten' : 'Cc selecteren'}
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
            {!contactGroupId ? (
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
                            <InputTinyMCEUpdateable
                                label={'Tekst'}
                                initialValue={initialHtmlBody}
                                value={htmlBody != '' ? htmlBody : initialHtmlBody}
                                onChangeAction={(newValueHtmlBody, editor) => setValueHtmlBody(newValueHtmlBody)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </PanelBody>
    );
}

ConceptFormGeneral.propTypes = {
    email: PropTypes.any,
    contactGroupName: PropTypes.any,
    emailAddressesToSelected: PropTypes.any,
    emailAddressesCcSelected: PropTypes.any,
    emailAddressesBccSelected: PropTypes.any,
    errors: PropTypes.any,
    handleToIds: PropTypes.any,
    handleCcIds: PropTypes.any,
    handleBccIds: PropTypes.any,
    handleInputChange: PropTypes.any,
    handleTextChange: PropTypes.any,
    hasLoaded: PropTypes.bool,
};

export default ConceptFormGeneral;
