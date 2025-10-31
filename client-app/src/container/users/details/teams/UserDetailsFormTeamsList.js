import React from 'react';
import { connect } from 'react-redux';

const UserDetailsFormTeamsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Naam</div>
                <div className="col-sm-1" />
            </div>
            {props.teams.length > 0 ? (
                props.teams.map(team => {
                    return (
                        <div className={`row border`}>
                            <div className="col-sm-12">{team.name}</div>
                        </div>
                    );
                })
            ) : (
                <div>Geen teams gekoppeld.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        teams: state.userDetails.teams,
    };
};
export default connect(mapStateToProps)(UserDetailsFormTeamsList);
