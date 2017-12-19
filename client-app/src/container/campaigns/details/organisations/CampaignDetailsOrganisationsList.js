import React from 'react';
import {connect} from 'react-redux';

import CampaignDetailsOrganisationItem from "./CampaignDetailsOrganisationItem";

const CampaignDetailsOrganisationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Nummer</div>
                <div className="col-sm-2">Organisatie</div>
                <div className="col-sm-2">Plaats</div>
                <div className="col-sm-2">Contact persoon</div>
                <div className="col-sm-2">Aangevraagde offertes</div>
                <div className="col-sm-2">Gewonnen offertes</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.organisations.length > 0 ?
                    props.organisations.map(organisation => {
                        return <CampaignDetailsOrganisationItem
                            key={organisation.id}
                            organisation={organisation}
                        />;
                    })
                    :
                    <div>Geen betrokken bedrijven bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        organisations: state.campaign.organisations,
    };
};
export default connect(mapStateToProps)(CampaignDetailsOrganisationsList);

