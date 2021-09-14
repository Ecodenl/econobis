import React, { useState } from 'react';

import PanelBody from '../../../../components/panel/PanelBody';
import InputTinyMCE from '../../../../components/form/InputTinyMCE';
import InputText from '../../../../components/form/InputText';
import * as PropTypes from 'prop-types';
import EmailAddressAPI from '../../../../api/contact/EmailAddressAPI';
import AsyncSelectSet from '../../../../components/form/AsyncSelectSet';

function ConceptFormGeneral(props) {
    const [searchTermContact, setSearchTermContact] = useState('');
    const [isLoadingContact, setLoadingContact] = useState(false);

    let {
        email,
        contactGroupName,
        emailAddresses,
        errors,
        hasLoaded,
        handleToIds,
        handleCcIds,
        handleBccIds,
        handleInputChange,
        handleTextChange,
    } = props;
    const { from, to, cc, bcc, subject, htmlBody, contactGroupId } = email;

    function selectedTo() {
        let toArray = [];
        let includesEmailAddress = false;
        if (!Array.isArray(to)) {
            toArray = to.split(',');
        } else {
            toArray = to;
        }
        let selectedTo = [];
        toArray.map(item => {
            if (item && item.includes('@')) {
                includesEmailAddress = true;
                selectedTo.push({
                    id: item,
                    name: item,
                    email: item,
                });
            }
            if (item && !isNaN(item)) {
                let emailaddress = emailAddresses.find(emailAddress => emailAddress.id === Number(item));

                selectedTo.push(emailaddress);
            }
        });
        return selectedTo;
    }

    function selectedCc() {
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
                let emailaddress = emailAddresses.find(emailAddress => emailAddress.id === Number(item));

                selectedCc.push(emailaddress);
            }
        });
        return selectedCc;
    }

    function selectedBcc() {
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
                let emailaddress = emailAddresses.find(emailAddress => emailAddress.id === Number(item));

                selectedBcc.push(emailaddress);
            }
        });
        return selectedBcc;
    }

    const getContactOptions = async () => {
        if (searchTermContact.length <= 2) return;

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
                                    e-mail adressen van anderen. Samenvoegvelden werken.
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
                                {(selectedTo + '').split(',').length > 1 ? (
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
                        value={selectedTo()}
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
                    value={selectedCc()}
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
                        value={selectedBcc()}
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
                            <InputTinyMCE label={'Tekst'} value={htmlBody} onChangeAction={handleTextChange} />
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
    emailAddresses: PropTypes.any,
    errors: PropTypes.any,
    handleToIds: PropTypes.any,
    handleCcIds: PropTypes.any,
    handleBccIds: PropTypes.any,
    handleInputChange: PropTypes.any,
    handleTextChange: PropTypes.any,
    hasLoaded: PropTypes.bool,
};

export default ConceptFormGeneral;
