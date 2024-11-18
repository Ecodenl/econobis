import React, { useEffect, useState } from 'react';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import axios from 'axios';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputToggle from '../../../../components/form/InputToggle';

function CampaignDetailsWorkflowNew({ campaignId, toggleShowNew, workflowForType, fetchCampaignData }) {
    const [statusId, setStatusId] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [emailTemplateIdWf, setEmailTemplateIdWf] = useState('');
    const [numberOfDaysToSendEmail, setNumberOfDaysToSendEmail] = useState('');
    const [mailToContactWf, setMailToContactWf] = useState(workflowForType === 'opportunity' ? false : true);
    const [mailCcToCoachWf, setMailCcToCoachWf] = useState(workflowForType === 'quotationrequest' ? true : false);
    const [mailReminderToCoachWf, setMailReminderToCoachWf] = useState(false);
    const [emailTemplateIdReminder, setEmailTemplateIdReminder] = useState('');
    const [numberOfDaysToSendEmailReminder, setNumberOfDaysToSendEmailReminder] = useState(1);
    const [errors, setErrors] = useState({
        statusId: false,
        emailTemplateIdWf: false,
        emailTemplateIdReminder: false,
        numberOfDaysToSendEmail: false,
        mailCcToCoachWfOrMailToContactWf: false,
        numberOfDaysToSendEmailReminder: false,
    });
    const [errorMessages, setErrorMessages] = useState({
        statusId: '',
        emailTemplateIdWf: '',
        emailTemplateIdReminder: '',
        numberOfDaysToSendEmail: '',
        mailCcToCoachWfOrMailToContactWf: '',
        numberOfDaysToSendEmailReminder: '',
    });

    const [emailtemplates, setEmailtemplates] = useState([]);
    const [statusesToSelect, setStatusesToSelect] = useState([]);

    useEffect(
        function() {
            axios
                .all([
                    EmailTemplateAPI.fetchEmailTemplatesPeek(),
                    CampaignDetailsAPI.fetchCampaignWorkflowStatuses({ campaignId, workflowForType }),
                ])
                .then(
                    axios.spread((emailtemplates, statusesToSelect) => {
                        setEmailtemplates(emailtemplates);
                        setStatusesToSelect(statusesToSelect.data.data);
                    })
                );
        },
        [campaignId, workflowForType]
    );
    // useEffect(function() {
    //     axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek()]).then(
    //         axios.spread((emailtemplates, mailboxAddresses) => {
    //             setEmailtemplates(emailtemplates);
    //         })
    //     );
    // }, []);

    function handleIsActiveChange(event) {
        setIsActive(event.target.value);
    }

    function handleMailCcToCoachWfChange(event) {
        setMailCcToCoachWf(event.target.checked);
    }

    function handleMailToContactWfChange(event) {
        setMailToContactWf(event.target.checked);
    }
    function handleMailReminderToCoachWfChange(event) {
        setMailReminderToCoachWf(event.target.value);
    }

    function handleStatusChange(event) {
        setStatusId(event.target.value);
    }

    function handleChangeEmailTemplateChange(event) {
        setEmailTemplateIdWf(event.target.value);
    }

    function handleNumberOfDaysToSendEmailChange(event) {
        setNumberOfDaysToSendEmail(event.target.value);
    }

    function handleChangeEmailTemplateReminderChange(event) {
        setEmailTemplateIdReminder(event.target.value);
    }

    function handleNumberOfDaysToSendEmailReminderChange(event) {
        setNumberOfDaysToSendEmailReminder(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errors = {
            statusId: false,
            emailTemplateIdWf: false,
            numberOfDaysToSendEmail: false,
            mailCcToCoachWfOrMailToContactWf: false,
            numberOfDaysToSendEmailReminder: false,
        };
        let errorMessages = {
            statusId: '',
            emailTemplateIdWf: '',
            emailTemplateIdReminder: '',
            numberOfDaysToSendEmail: '',
            mailCcToCoachWfOrMailToContactWf: '',
            numberOfDaysToSendEmailReminder: '',
        };
        let hasErrors = false;

        if (!statusId) {
            errors.statusId = true;
            errorMessages.statusId = 'Status is verplicht.';
            hasErrors = true;
        }

        if (!emailTemplateIdWf) {
            errors.emailTemplateIdWf = true;
            errorMessages.emailTemplateIdWf = 'E-email template is verplicht.';
            hasErrors = true;
        }

        if (Boolean(mailReminderToCoachWf) === true && !emailTemplateIdReminder) {
            errors.emailTemplateIdReminder = true;
            errorMessages.emailTemplateIdReminder = 'E-email template herinnering is verplicht.';
            hasErrors = true;
        }

        if (numberOfDaysToSendEmail === null || numberOfDaysToSendEmail === '') {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status is verplicht';
            hasErrors = true;
        }

        if (mailCcToCoachWf == false && mailToContactWf == false) {
            errors.mailCcToCoachWfOrMailToContactWf = true;
            errorMessages.mailCcToCoachWfOrMailToContactWf =
                'Minimaal één van de volgende opties is verplicht: Email bewoner en/of Email coach';
            hasErrors = true;
        }
        if (numberOfDaysToSendEmail < 0) {
            errors.numberOfDaysToSendEmail = true;
            errorMessages.numberOfDaysToSendEmail = 'Aantal dagen e-mail na deze status mag niet negatief zijn';
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

        if (!hasErrors) {
            const data = new FormData();
            data.append('campaignId', campaignId);
            data.append('statusId', statusId);
            data.append('isActive', isActive == 1 ? 1 : 0);
            data.append('emailTemplateIdWf', emailTemplateIdWf);
            data.append('numberOfDaysToSendEmail', numberOfDaysToSendEmail);
            data.append('workflowForType', workflowForType);
            data.append('campaignId', campaignId);
            data.append('isActive', isActive == 1 ? 1 : 0);
            data.append('mailToContactWf', mailToContactWf == 1 ? 1 : 0);
            data.append('mailCcToCoachWf', mailCcToCoachWf == 1 ? 1 : 0);
            data.append('mailReminderToCoachWf', mailReminderToCoachWf == 1 ? 1 : 0);
            data.append('emailTemplateIdReminder', emailTemplateIdReminder);
            data.append('numberOfDaysToSendEmailReminder', numberOfDaysToSendEmailReminder);

            try {
                await CampaignDetailsAPI.addCampaignWorkflow(data);

                fetchCampaignData();
                toggleShowNew();
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
                        <InputSelect
                            label={'Status'}
                            size={'col-sm-6'}
                            name={'statusId'}
                            options={statusesToSelect}
                            value={statusId}
                            onChangeAction={handleStatusChange}
                            required={'required'}
                            error={errors.statusId}
                            errorMessage={errorMessages.statusId}
                        />
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
                            onChangeAction={handleNumberOfDaysToSendEmailChange}
                            required={'required'}
                            min={0}
                            error={errors.numberOfDaysToSendEmail}
                            errorMessage={errorMessages.numberOfDaysToSendEmail}
                        />
                    </div>

                    {workflowForType === 'quotationrequest' ? (
                        <>
                            <div className="row">
                                <div className="form-group col-sm-6" />
                                <InputToggle
                                    label={'E-mail bewoner'}
                                    name={'mailToContactWf'}
                                    value={Boolean(mailToContactWf)}
                                    onChangeAction={handleMailToContactWfChange}
                                />
                            </div>

                    <div className="row">
                        <InputToggle
                            label={'Actief'}
                            name={'isActive'}
                            value={Boolean(isActive)}
                            onChangeAction={handleIsActiveChange}
                        />
                        {workflowForType === 'quotationrequest' ? (
                            <InputToggle
                                label={'E-mail coach'}
                                name={'mailCcToCoachWf'}
                                value={Boolean(mailCcToCoachWf)}
                                onChangeAction={handleMailCcToCoachWfChange}
                            />
                        ) : null}
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
                            onClickAction={toggleShowNew}
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

export default CampaignDetailsWorkflowNew;
