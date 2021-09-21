import React from 'react';
import CampaignDetailsOrganisationItem from './CampaignDetailsOrganisationItem';

const CampaignDetailsOrganisationsList = ({ organisations, campaignId, fetchCampaignData }) => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Nummer</div>
                <div className="col-sm-2">Organisatie</div>
                <div className="col-sm-2">Plaats</div>
                <div className="col-sm-2">Contactpersoon</div>
                <div className="col-sm-2">Aangevraagde offertes</div>
                <div className="col-sm-2">Gewonnen offertes</div>
                <div className="col-sm-1" />
            </div>
            {organisations.length > 0 ? (
                organisations.map(organisation => {
                    return (
                        <CampaignDetailsOrganisationItem
                            key={organisation.id}
                            organisation={organisation}
                            campaignId={campaignId}
                            fetchCampaignData={fetchCampaignData}
                        />
                    );
                })
            ) : (
                <div>Geen betrokken bedrijven bekend.</div>
            )}
        </div>
    );
};

export default CampaignDetailsOrganisationsList;
