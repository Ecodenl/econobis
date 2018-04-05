import React from 'react';
import {connect} from 'react-redux';

import ContactDetailsCampaignItem from "./ContactDetailsCampaignItem";

const ContactDetailsCampaignsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-3">Naam</div>
                <div className="col-sm-3">Startdatum</div>
                <div className="col-sm-3">Einddatum</div>
                <div className="col-sm-1">Taken</div>
            </div>
            {
                props.campaigns.length > 0 ?
                    props.campaigns.map(campaign => {
                        return <ContactDetailsCampaignItem
                            key={campaign.id}
                            campaign={campaign}
                        />;
                    })
                    :
                    <div>Geen campagnes bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        campaigns: state.contactDetails.organisation.campaigns,
    };
};
export default connect(mapStateToProps)(ContactDetailsCampaignsList);

