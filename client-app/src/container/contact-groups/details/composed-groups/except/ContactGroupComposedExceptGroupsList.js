import React from 'react';
import { connect } from 'react-redux';

import ContactGroupComposedExceptGroupItem from './ContactGroupComposedExceptGroupItem';

const ContactGroupComposedExceptGroupsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-12">Groep</div>
            </div>
            {props.composedExceptGroups.length > 0 ? (
                props.composedExceptGroups.map(exceptedGroup => {
                    return (
                        <ContactGroupComposedExceptGroupItem
                            key={exceptedGroup.id}
                            composedExceptGroup={exceptedGroup}
                            contactGroupId={props.contactGroupId}
                        />
                    );
                })
            ) : (
                <div>Geen uitgezonderde groepen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        composedExceptGroups: state.contactGroupDetails.composedExceptGroups,
        contactGroupId: state.contactGroupDetails.id,
    };
};
export default connect(mapStateToProps)(ContactGroupComposedExceptGroupsList);
