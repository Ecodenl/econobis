import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import CampaignFormEdit from './CampaignFormEdit';
import CampaignFormView from './CampaignFormView';
import useSwitchToEditView from '../../../../hooks/useSwitchToEditView';

function CampaignFormGeneral({ campaign, permissions, fetchCampaignData }) {
    const { state, switchToEdit, switchToView, onDivEnter, onDivLeave } = useSwitchToEditView();

    return (
        <Panel className={state.activeDiv} onMouseEnter={() => onDivEnter()} onMouseLeave={() => onDivLeave()}>
            <PanelBody>
                {state.showEdit && permissions.manageMarketing ? (
                    <CampaignFormEdit
                        campaign={campaign}
                        switchToView={switchToView}
                        fetchCampaignData={fetchCampaignData}
                    />
                ) : (
                    <CampaignFormView campaign={campaign} switchToEdit={switchToEdit} />
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

export default connect(mapStateToProps)(CampaignFormGeneral);
