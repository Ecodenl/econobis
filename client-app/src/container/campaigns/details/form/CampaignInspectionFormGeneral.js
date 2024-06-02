import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import useSwitchToEditView from '../../../../hooks/useSwitchToEditView';
import CampaignInspectionFormEdit from './CampaignInspectionFormEdit';
import CampaignInspectionFormView from './CampaignInspectionFormView';
import PanelHeader from '../../../../components/panel/PanelHeader';

function CampaignInspectionFormGeneral({ campaign, permissions, fetchCampaignData }) {
    const { state, switchToEdit, switchToView, onDivEnter, onDivLeave } = useSwitchToEditView();

    return (
        <Panel className={state.activeDiv} onMouseEnter={() => onDivEnter()} onMouseLeave={() => onDivLeave()}>
            <PanelHeader>
                <span className="h5 text-bold">Portaal workflow instellingen</span>
            </PanelHeader>
            <PanelBody>
                {state.showEdit && permissions.manageMarketing ? (
                    <CampaignInspectionFormEdit
                        campaign={campaign}
                        switchToView={switchToView}
                        fetchCampaignData={fetchCampaignData}
                    />
                ) : (
                    <CampaignInspectionFormView campaign={campaign} switchToEdit={switchToEdit} />
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

export default connect(mapStateToProps)(CampaignInspectionFormGeneral);
