import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import CampaignsList from './CampaignsList';

const CampaignHarmonica = ({toggleShowList, showCampaignsList, campaignCount, newCampaign, permissions}) => {
    return (
        <div>
            <Panel className="harmonica-button">
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span>CAMPAGNES <span className="badge">{ campaignCount }</span></span>
                    </div>
                    <div className={"col-sm-2"}>
                        {permissions.manageMarketing &&
                        <a role="button" className="pull-right" onClick={newCampaign}><span
                            className="glyphicon glyphicon-plus glyphicon-white"/></a>
                        }
                    </div>
                    <div className="col-sm-12">
                        { showCampaignsList && <CampaignsList /> }
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(CampaignHarmonica);