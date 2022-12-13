import React from 'react';
import CampaignDetailsExternalPartyItem from './CampaignDetailsExternalPartyItem';

const CampaignDetailsExternalPartiesList = ({ externalParties, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-4">Externe partij</div>
                <div className="col-sm-4">Plaats</div>
                <div className="col-sm-1" />
            </div>
            {externalParties.length > 0 ? (
                externalParties.map(externalParty => {
                    return (
                        <CampaignDetailsExternalPartyItem
                            key={externalParty.id}
                            externalParty={externalParty}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen betrokken externe partijen bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsExternalPartiesList;
