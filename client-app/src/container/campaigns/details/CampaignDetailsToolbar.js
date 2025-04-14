import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import CampaignDetailsDelete from './CampaignDetailsDelete';

function CampaignDetailsToolbar({ campaign, permissions }) {
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);

    function toggleDelete() {
        setShowDelete(prev => !prev);
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-2">
                            <div className="btn-group btn-group-flex margin-small" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                                {permissions.manageMarketing && (
                                    <ButtonIcon iconName={'trash'} onClickAction={toggleDelete} />
                                )}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h4 className="text-center text-success margin-small">
                                <strong>{campaign.name ? 'Campagne: ' + campaign.name : ''}</strong>
                            </h4>
                        </div>
                        <div className="col-md-2" />
                    </PanelBody>
                </Panel>
            </div>

            {showDelete && (
                <CampaignDetailsDelete
                    id={campaign.id}
                    numberOfIntakes={campaign.numberOfIntakes}
                    closeDeleteItemModal={toggleDelete}
                />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsToolbar);
