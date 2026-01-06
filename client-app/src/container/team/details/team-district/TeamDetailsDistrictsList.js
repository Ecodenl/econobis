import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsDistrictsItem from './TeamDetailsDistrictsItem';

const TeamDetailsDistrictsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Afspraak kalender</div>
                <div className="col-sm-1" />
            </div>
            {props.districts && props.districts.length > 0 ? (
                props.districts.map(district => {
                    return <TeamDetailsDistrictsItem key={district.id} district={district} />;
                })
            ) : (
                <div>
                    Geen afspraak kalenders gekoppeld. Gebruikers van dit team geautoriseerd voor alle afspraak
                    kalenders!
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        districts: state.teamDetails.districts,
    };
};
export default connect(mapStateToProps)(TeamDetailsDistrictsList);
