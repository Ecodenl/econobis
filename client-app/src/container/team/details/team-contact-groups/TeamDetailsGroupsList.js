import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsGroupsItem from './TeamDetailsGroupsItem';

const TeamDetailsGroupsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Naam</div>
                <div className="col-sm-1" />
            </div>
            {props.groups.length > 0 ? (
                props.groups.map(group => {
                    return <TeamDetailsGroupsItem key={group.id} group={group} />;
                })
            ) : (
                <div>Geen gebruikers bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        groups: state.teamDetails.groups,
    };
};
export default connect(mapStateToProps)(TeamDetailsGroupsList);
