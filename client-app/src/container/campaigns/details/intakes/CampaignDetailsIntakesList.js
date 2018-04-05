import React from 'react';
import {connect} from 'react-redux';

import CampaignDetailsIntakeItem from "./CampaignDetailsIntakeItem";

const CampaignDetailsIntakesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Id</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Naam</div>
                <div className="col-sm-2">Adres</div>
                <div className="col-sm-2">Postcode</div>
                <div className="col-sm-2">Plaats</div>
                <div className="col-sm-2">Gereageerd op</div>
            </div>
            {
                props.intakes.length > 0 ?
                    props.intakes.map(intake => {
                        return <CampaignDetailsIntakeItem
                            key={intake.id}
                            intake={intake}
                        />;
                    })
                    :
                    <div>Geen intakes bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        intakes: state.campaignDetails.intakes,
    };
};
export default connect(mapStateToProps)(CampaignDetailsIntakesList);

