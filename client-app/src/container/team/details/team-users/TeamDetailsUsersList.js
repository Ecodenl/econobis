import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsUsersItem from './TeamDetailsUsersItem';

const TeamDetailsUsersList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-9">Naam</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-1" />
            </div>
            {props.users.length > 0 ? (
                props.users.map(user => {
                    return <TeamDetailsUsersItem key={user.id} user={user} />;
                })
            ) : (
                <div>Geen gebruikers gekoppeld.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.teamDetails.users,
    };
};
export default connect(mapStateToProps)(TeamDetailsUsersList);
