import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import PanelBody from '../../../../components/panel/PanelBody';
import Panel from '../../../../components/panel/Panel';
import PanelHeader from '../../../../components/panel/PanelHeader';
import ViewText from '../../../../components/form/ViewText';

moment.locale('nl');

function CampaignInspectionFormEdit({
    campaign,
    fetchCampaignData,
    switchToView,
    // mailboxes,
    // emailtemplates,
}) {
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
    });
    const [errors, setErrors] = useState({
        inspectionPlannedEmailTemplateId: false,
        inspectionPlannedMailboxId: false,
        inspectionRecordedEmailTemplateId: false,
        inspectionReleasedEmailTemplateId: false,
    });

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    function handleInputChangeDate(date, name) {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        setFormState({
            ...formState,
            [name]: formattedDate,
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
            <div className="row">
                <ViewText
                    label={'Buurtaanpak afspraak e-mail template'}
                    value={formState.inspectionPlannedEmailTemplate && formState.inspectionPlannedEmailTemplate.name}
                />
                <ViewText
                    label={'Mailbox buurtaanpak e-mail bevestigingen'}
                    value={formState.inspectionPlannedMailbox && formState.inspectionPlannedMailbox.name}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Buurtaanpak opname e-mail template'}
                    value={formState.inspectionRecordedEmailTemplate && formState.inspectionRecordedEmailTemplate.name}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Buurtaanpak uitgebracht e-mail template'}
                    value={formState.inspectionReleasedEmailTemplate && formState.inspectionReleasedEmailTemplate.name}
                />
            </div>
            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={switchToView} />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
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
