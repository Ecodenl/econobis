import React from 'react';

import CampaignDetailsConclusionView from './CampaignDetailsConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import CampaignDetailsConclusionEdit from './CampaignDetailsConclusionEdit';
import { connect } from 'react-redux';
import useSwitchToEditView from '../../../../hooks/useSwitchToEditView';

function CampaignDetailsConclusionForm({ campaign, permissions, fetchCampaignData }) {
    const { state, switchToEdit, switchToView, onDivEnter, onDivLeave } = useSwitchToEditView();

    return (
        <Panel className={state.activeDiv} onMouseEnter={() => onDivEnter()} onMouseLeave={() => onDivLeave()}>
            <PanelBody>
                {state.showEdit && permissions.manageMarketing ? (
                    <CampaignDetailsConclusionEdit
                        campaign={campaign}
                        switchToView={switchToView}
                        fetchCampaignData={fetchCampaignData}
                    />
                ) : (
                    <CampaignDetailsConclusionView campaign={campaign} switchToEdit={switchToEdit} />
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

export default connect(mapStateToProps)(CampaignDetailsConclusionForm);
