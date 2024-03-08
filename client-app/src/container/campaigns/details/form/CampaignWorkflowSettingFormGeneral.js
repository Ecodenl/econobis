import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import useSwitchToEditView from '../../../../hooks/useSwitchToEditView';
import PanelHeader from '../../../../components/panel/PanelHeader';
import CampaignWorkflowSettingFormView from './CampaignWorkflowSettingFormView';
import CampaignWorkflowSettingFormEdit from './CampaignWorflowSettingFormEdit';

function CampaignWorkflowSettingFormGeneral({ campaign, permissions, fetchCampaignData }) {
    const { state, switchToEdit, switchToView, onDivEnter, onDivLeave } = useSwitchToEditView();

    return (
        <Panel className={state.activeDiv} onMouseEnter={() => onDivEnter()} onMouseLeave={() => onDivLeave()}>
            <PanelHeader>
                <span className="h5 text-bold">Workflow instellingen</span>
            </PanelHeader>
            <PanelBody>
                {state.showEdit && permissions.manageMarketing ? (
                    <CampaignWorkflowSettingFormEdit
                        campaign={campaign}
                        switchToView={switchToView}
                        fetchCampaignData={fetchCampaignData}
                    />
                ) : (
                    <CampaignWorkflowSettingFormView campaign={campaign} switchToEdit={switchToEdit} />
                )}
            </PanelBody>
        </Panel>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignWorkflowSettingFormGeneral);
