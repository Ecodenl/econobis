import React from 'react';
import { connect } from 'react-redux';

import ContactDetailsGroupItem from './ContactDetailsGroupItem';

const ContactDetailsGroupsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-8">Naam</div>
                <div className="col-sm-4">Type</div>
            </div>
            {props.visibleGroups.length > 0 ? (
                props.visibleGroups.map(group => {
                    return <ContactDetailsGroupItem key={group.id} group={group} />;
                })
            ) : (
                <div>Geen groepen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        visibleGroups: state.contactDetails.visibleGroups,
    };
};
export default connect(mapStateToProps)(ContactDetailsGroupsList);
