import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';

import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from "../../../components/panel/PanelBody";
import PanelHeader from "../../../components/panel/PanelHeader";
import Panel from "../../../components/panel/Panel";
import InputTinyMCE from "../../../components/form/InputTinyMCE";
import InputMultiSelect from "../../../components/form/InputMultiSelect";
import InputMultiSelectCreate from "../../../components/form/InputMultiSelectCreate";

import EmailAttachments from "./attachments/EmailAttachments";
import EmailNewFormGeneral from "./general/EmailNewFormGeneral";

const EmailNewForm = ({email, emailAddresses, errors, handleSubmit, handleToIds, handleCcIds, handleBccIds, handleInputChange, handleTextChange, onDrop}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel>
                <EmailNewFormGeneral
                    email={email}
                    emailAddresses={emailAddresses}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleToIds={handleToIds}
                    handleCcIds={handleCcIds}
                    handleBccIds={handleBccIds}
                    handleInputChange={handleInputChange}
                    handleTextChange={handleTextChange}
                />

                <EmailAttachments attachments={email.attachments} onDrop={onDrop} />

            </Panel>
        </form>
    );
};

export default EmailNewForm;
