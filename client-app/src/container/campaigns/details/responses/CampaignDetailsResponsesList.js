import React from 'react';
import {connect} from 'react-redux';

import CampaignDetailsResponseItem from "./CampaignDetailsResponseItem";

const CampaignDetailsResponseList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Nummer</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-2">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-2">Woonplaats</div>
                <div className="col-sm-2">Gereageerd op</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.responses.length > 0 ?
                    props.responses.map(response => {
                        return <CampaignDetailsResponseItem
                            key={response.id}
                            response={response}
                        />;
                    })
                    :
                    <div>Geen reponses bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        responses: state.campaign.responses,
    };
};
export default connect(mapStateToProps)(CampaignDetailsResponseList);

