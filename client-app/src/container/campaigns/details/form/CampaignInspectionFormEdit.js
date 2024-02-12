import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import axios from 'axios';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';

moment.locale('nl');

function CampaignInspectionFormEdit({ campaign, fetchCampaignData, switchToView }) {
    const [formState, setFormState] = useState({
        ...campaign,
        description: campaign.description || '',
        statusId: campaign.status?.id || '',
        typeId: campaign.type?.id || '',
        measureCategoryIds: campaign.measureCategories?.map(item => item.id).join(','),
        measureCategoryIdsSelected: campaign.measureCategories ? campaign.measureCategories : [],
        opportunityActionIds: campaign.opportunityActions?.map(item => item.id).join(','),
        opportunityActionIdsSelected: campaign.opportunityActions ? campaign.opportunityActions : [],
        inspectionPlannedEmailTemplateId: campaign.inspectionPlannedEmailTemplate?.id || '',
        inspectionPlannedMailboxId: campaign.inspectionPlannedMailbox?.id || '',
        inspectionRecordedEmailTemplateId: campaign.inspectionRecordedEmailTemplate?.id || '',
        inspectionReleasedEmailTemplateId: campaign.inspectionReleasedEmailTemplate?.id || '',
        defaultWorkflowMailboxId: campaign.defaultWorkflowMailbox?.id || '',
    });
    const [errors, setErrors] = useState({
        inspectionPlannedEmailTemplateId: false,
        inspectionPlannedMailboxId: false,
        inspectionRecordedEmailTemplateId: false,
        inspectionReleasedEmailTemplateId: false,
    });

    const [mailboxAddresses, setMailboxAddresses] = useState([]);
    const [emailtemplates, setEmailtemplates] = useState([]);

    useEffect(function() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek(), MailboxAPI.fetchMailboxesLoggedInUserPeek()]).then(
            axios.spread((emailtemplates, mailboxAddresses) => {
                setMailboxAddresses(mailboxAddresses.data.data);
                setEmailtemplates(emailtemplates);
            })
        );
    }, []);

    // function handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //
    //     setFormState({
    //         ...formState,
    //         [name]: value,
    //     });
    // }
    function setFieldValue(name, value) {
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let errorsObj = {};
        let hasErrors = false;

        setErrors(errorsObj);

        if (!hasErrors) {
            try {
                await CampaignDetailsAPI.updateCampaign(formState.id, formState);

                fetchCampaignData();
                switchToView();
            } catch (error) {
                alert('Er is iets misgegaan met het opslaan van de gegevens!');
            }
        }
    }

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div>
                <div className="row">
                    <InputReactSelect
                        label={'Buurtaanpak afspraak e-mail template'}
                        name={'inspectionPlannedEmailTemplate'}
                        options={emailtemplates}
                        optionName={'name'}
                        value={formState.inspectionPlannedEmailTemplate}
                        onChangeAction={(value, name) => setFieldValue(name, value)}
                        clearable={true}
                    />

                    <InputReactSelect
                        label={'Mailbox buurtaanpak e-mail bevestigingen'}
                        name={'inspectionPlannedMailboxId'}
                        options={mailboxAddresses}
                        optionName={'email'}
                        value={formState.inspectionPlannedMailboxId}
                        onChangeAction={(value, name) => setFieldValue(name, value)}
                        clearable={true}
                    />
                </div>
                <div className="row">
                    <InputReactSelect
                        label={'Buurtaanpak opname e-mail template'}
                        name={'inspectionRecordedEmailTemplate'}
                        options={emailtemplates}
                        optionName={'name'}
                        value={formState.inspectionRecordedEmailTemplate}
                        onChangeAction={(value, name) => setFieldValue(name, value)}
                        clearable={true}
                    />
                </div>
                <div className="row">
                    <InputReactSelect
                        label={'Buurtaanpak uitgebracht e-mail template'}
                        name={'inspectionReleasedEmailTemplate'}
                        options={emailtemplates}
                        optionName={'name'}
                        value={formState.inspectionReleasedEmailTemplate}
                        onChangeAction={(value, name) => setFieldValue(name, value)}
                        clearable={true}
                    />
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </div>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        status: state.systemData.campaignStatuses,
        types: state.systemData.campaignTypes,
        measureCategories: state.systemData.measureCategories,
        opportunityActions: state.systemData.opportunityActions,
    };
};

export default connect(mapStateToProps)(CampaignInspectionFormEdit);
