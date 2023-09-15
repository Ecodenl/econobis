import React from 'react';

import HoomCampaignsItem from './HoomCampaignsItem';

const HoomCampaignsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-6">Campagne</div>
                <div className="col-sm-5">Maatregel specifiek</div>
                <div className="col-sm-1" />
            </div>
            {props.hoomCampaigns.length > 0 ? (
                props.hoomCampaigns.map(hoomCampaign => {
                    return (
                        <HoomCampaignsItem
                            key={hoomCampaign.id}
                            showEditCooperation={props.showEditCooperation}
                            hoomCampaign={hoomCampaign}
                            removeResult={props.removeResult}
                        />
                    );
                })
            ) : (
                <div>Geen campagnes bekend.</div>
            )}
        </div>
    );
};

export default HoomCampaignsList;
