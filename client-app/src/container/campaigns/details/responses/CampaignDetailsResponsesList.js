import React from 'react';

import CampaignDetailsResponseItem from './CampaignDetailsResponseItem';

const CampaignDetailsResponseList = ({ responses, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Nummer</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-2">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-2">Plaats</div>
                <div className="col-sm-2">Gereageerd op</div>
                <div className="col-sm-1" />
            </div>
            {responses.length > 0 ? (
                responses.map(response => {
                    return (
                        <CampaignDetailsResponseItem
                            key={response.id}
                            response={response}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen responses bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsResponseList;
