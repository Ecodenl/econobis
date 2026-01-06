import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsContactGroupsItem from './TeamDetailsContactGroupsItem';

const TeamDetailsContactGroupsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-9">Groep naam</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-1" />
            </div>
            {props.contactGroups && props.contactGroups.length > 0 ? (
                props.contactGroups.map(contactGroup => {
                    return <TeamDetailsContactGroupsItem key={contactGroup.id} contactGroup={contactGroup} />;
                })
            ) : (
                <div>Geen groepen gekoppeld. Gebruikers van dit team geautoriseerd voor alle contacten!</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contactGroups: state.teamDetails.contactGroups,
    };
};
export default connect(mapStateToProps)(TeamDetailsContactGroupsList);
