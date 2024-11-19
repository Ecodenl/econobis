import React, { useEffect, useState } from 'react';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import axios from 'axios';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputToggle from '../../../../components/form/InputToggle';

function CampaignDetailsWorkflowEdit({ campaignWorkflow, cancelEdit, fetchCampaignData }) {
    const [isActive, setIsActive] = useState(campaignWorkflow.isActive);
    const [emailTemplateIdWf, setEmailTemplateIdWf] = useState(campaignWorkflow.emailTemplateWorkflow.id);
    const [numberOfDaysToSendEmail, setNumberOfDaysToSendEmail] = useState(campaignWorkflow.numberOfDaysToSendEmail);
    const [mailToContactWf, setMailToContactWf] = useState(campaignWorkflow.mailToContactWf);
    const [mailCcToCoachWf, setMailCcToCoachWf] = useState(campaignWorkflow.mailCcToCoachWf);
    const [mailReminderToCoachWf, setMailReminderToCoachWf] = useState(campaignWorkflow.mailReminderToCoachWf);
    const [emailTemplateIdReminder, setEmailTemplateIdReminder] = useState(
        campaignWorkflow.emailTemplateReminder ? campaignWorkflow.emailTemplateReminder.id : ''
    );
    const [numberOfDaysToSendEmailReminder, setNumberOfDaysToSendEmailReminder] = useState(
        campaignWorkflow.numberOfDaysToSendEmailReminder
    );
    const [errors, setErrors] = useState({
        emailTemplateIdWf: false,
        emailTemplateIdReminder: false,
        numberOfDaysToSendEmail: false,
        numberOfDaysToSendEmailReminder: false,
        mailCcToCoachWfOrMailToContactWf: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        emailTemplateIdWf: '',
        emailTemplateIdReminder: '',
        numberOfDaysToSendEmail: '',
        numberOfDaysToSendEmailReminder: '',
        mailCcToCoachWfOrMailToContactWf: '',
    });

    const [emailtemplates, setEmailtemplates] = useState([]);

    useEffect(function() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek()]).then(
            axios.spread((emailtemplates, mailboxAddresses) => {
                setEmailtemplates(emailtemplates);
            })
        );
    }, []);

    function handleIsActiveChange(event) {
        setIsActive(event.target.checked);
    }

    function handleMailToContactWfChange(event) {
        setMailToContactWf(event.target.checked);
    }
    function handleMailCcToCoachWfChange(event) {
        setMailCcToCoachWf(event.target.checked);
    }

    function handleMailReminderToCoachWfChange(event) {
        setMailReminderToCoachWf(event.target.checked);
    }

    function handleChangeEmailTemplateChange(event) {
        setEmailTemplateIdWf(event.target.value);
    }

    function handleChangeEmailTemplateReminderChange(event) {
        setEmailTemplateIdReminder(event.target.value);
    }

    function handleNumberOfDaysToSendEmailChange(event) {
        setNumberOfDaysToSendEmail(event.target.value);
    }

    function handleNumberOfDaysToSendEmailReminderChange(event) {
        setNumberOfDaysToSendEmailReminder(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errors = {
            emailTemplateIdWf: false,
            emailTemplateIdReminder: false,
            numberOfDaysToSendEmail: false,
            numberOfDaysToSendEmailReminder: false,
            mailCcToCoachWfOrMailToContactWf: false,
        };
        let errorMessages = {
            emailTemplateIdWf: '',
            emailTemplateIdReminder: '',
            numberOfDaysToSendEmail: '',
            numberOfDaysToSendEmailReminder: '',
            mailCcToCoachWfOrMailToContactWf: '',
        };
        let hasErrors = false;

        if (!emailTemplateIdWf) {
            errors.emailTemplateIdWf = true;
            errorMessages.emailTemplateIdWf = 'E-email template is verplicht.';
            hasErrors = true;
        }

        if (numberOfDaysToSendEmail === null || numberOfDaysToSendEmail === '') {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status is verplicht';
            hasErrors = true;
        }
        if (numberOfDaysToSendEmail < 0) {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status mag niet negatief zijn';
            hasErrors = true;
        }

        if (campaignWorkflow.workflowForType === 'quotationrequest') {
            if (Boolean(mailReminderToCoachWf) === true && !emailTemplateIdReminder) {
                errors.emailTemplateIdReminder = true;
                errorMessages.emailTemplateIdReminder = 'E-email template herinnering is verplicht.';
                hasErrors = true;
            }
            if (mailCcToCoachWf == 0 && mailToContactWf == 0) {
                errors.mailCcToCoachWfOrMailToContactWf = true;
                errorMessages.mailCcToCoachWfOrMailToContactWf =
                    'Minimaal één van de volgende opties is verplicht: Email bewoner en/of Email coach';
                hasErrors = true;
            }
            if (
                Boolean(mailReminderToCoachWf) === true &&
                (numberOfDaysToSendEmailReminder === null ||
                    numberOfDaysToSendEmailReminder === '' ||
                    numberOfDaysToSendEmailReminder == 0)
            ) {
                errors.numberOfDaysToSendEmailReminder = true;
                errorMessages.numberOfDaysToSendEmailReminder =
                    'Aantal dagen e-mail herinnering na deze status is verplicht en moet minimaal 1 zijn';
                hasErrors = true;
            }
            if (numberOfDaysToSendEmailReminder < 0) {
                errors.numberOfDaysToSendEmailReminder = true;
                errorMessages.numberOfDaysToSendEmailReminder =
                    'Aantal dagen e-mail herinnering na deze status mag niet negatief zijn';
                hasErrors = true;
            }
        }

        if (!hasErrors) {
            try {
                const data = new FormData();
                data.append('isActive', isActive == 1 ? 1 : 0);
                data.append('emailTemplateIdWf', emailTemplateIdWf);
                data.append('numberOfDaysToSendEmail', numberOfDaysToSendEmail);
                data.append('mailToContactWf', mailToContactWf == 1 ? 1 : 0);
                data.append('mailCcToCoachWf', mailCcToCoachWf == 1 ? 1 : 0);
                data.append('mailReminderToCoachWf', mailReminderToCoachWf == 1 ? 1 : 0);
                data.append('emailTemplateIdReminder', emailTemplateIdReminder);
                data.append('numberOfDaysToSendEmailReminder', numberOfDaysToSendEmailReminder);

                await CampaignDetailsAPI.editCampaignWorkflow(campaignWorkflow.id, data);

                fetchCampaignData();
                cancelEdit(true);
            } catch (error) {
                alert(
                    'Er is iets misgegaan met het toevoegen van de status. Herlaad de pagina en probeer het nogmaals.'
                );
            }
        } else {
            setErrors(errors);
            setErrorMessages(errorMessages);
        }
    }

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <InputToggle
                            label={'Actief'}
                            name={'isActive'}
                            value={Boolean(isActive)}
                            onChangeAction={handleIsActiveChange}
                        />
                    </div>
                    <div className="row">
                        <InputSelect
                            label={'E-email template'}
                            size={'col-sm-6'}
                            name={'emailTemplateIdWf'}
                            options={emailtemplates}
                            value={emailTemplateIdWf}
                            required={'required'}
                            onChangeAction={handleChangeEmailTemplateChange}
                            error={errors.emailTemplateIdWf}
                            errorMessage={errorMessages.emailTemplateIdWf}
                        />

                        <InputText
                            label={'Aantal dagen e-mail na deze status'}
                            divSize={'col-sm-6'}
                            type={'number'}
                            id={'numberOfDaysToSendEmail'}
                            name={'numberOfDaysToSendEmail'}
                            value={numberOfDaysToSendEmail}
                            allowZero={true}
                            onChangeAction={handleNumberOfDaysToSendEmailChange}
                            required={'required'}
                            min={0}
                            error={errors.numberOfDaysToSendEmail}
                            errorMessage={errorMessages.numberOfDaysToSendEmail}
                        />
                    </div>

                    {campaignWorkflow.workflowForType === 'quotationrequest' ? (
                        <>
                            <div className="row">
                                <div className="form-group col-sm-6 "></div>
                                <InputToggle
                                    label={'E-mail bewoner'}
                                    name={'mailToContactWf'}
                                    value={Boolean(mailToContactWf)}
                                    onChangeAction={handleMailToContactWfChange}
                                />
                            </div>

                            <div className="row">
                                <div className="form-group col-sm-6" />
                                <InputToggle
                                    label={'E-mail coach'}
                                    name={'mailCcToCoachWf'}
                                    value={Boolean(mailCcToCoachWf)}
                                    onChangeAction={handleMailCcToCoachWfChange}
                                />
                            </div>

                            {errors.mailCcToCoachWfOrMailToContactWf && (
                                <div className={'row'}>
                                    <div className="form-group col-sm-6"></div>
                                    <div className="col-sm-6 has-error-message">
                                        {errorMessages.mailCcToCoachWfOrMailToContactWf}
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                <div className="form-group col-sm-6" />
                                <InputToggle
                                    label={'Herinnering Email coach'}
                                    name={'mailReminderToCoachWf'}
                                    value={Boolean(mailReminderToCoachWf)}
                                    onChangeAction={handleMailReminderToCoachWfChange}
                                />
                            </div>

                            <div className="row">
                                <InputSelect
                                    label={'E-email template herinnering'}
                                    size={'col-sm-6'}
                                    name={'emailTemplateIdReminder'}
                                    options={emailtemplates}
                                    value={emailTemplateIdReminder}
                                    required={mailReminderToCoachWf ? 'required' : ''}
                                    onChangeAction={handleChangeEmailTemplateReminderChange}
                                    error={errors.emailTemplateIdReminder}
                                    errorMessage={errorMessages.emailTemplateIdReminder}
                                />
                                <InputText
                                    label={'Aantal dagen na aanmaken'}
                                    divSize={'col-sm-6'}
                                    type={'number'}
                                    id={'numberOfDaysToSendEmailReminder'}
                                    name={'numberOfDaysToSendEmailReminder'}
                                    value={numberOfDaysToSendEmailReminder}
                                    allowZero={true}
                                    onChangeAction={handleNumberOfDaysToSendEmailReminderChange}
                                    required={mailReminderToCoachWf ? 'required' : ''}
                                    min={0}
                                    error={errors.numberOfDaysToSendEmailReminder}
                                    errorMessage={errorMessages.numberOfDaysToSendEmailReminder}
                                />
                            </div>
                        </>
                    ) : null}

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={cancelEdit}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}

export default CampaignDetailsWorkflowEdit;
