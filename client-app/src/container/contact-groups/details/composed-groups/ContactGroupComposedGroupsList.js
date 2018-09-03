import React from 'react';
import {connect} from 'react-redux';

import ContactGroupComposedGroupItem from "./ContactGroupComposedGroupItem";

const ContactGroupComposedGroupsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-12">Groep</div>
            </div>
            {
                props.composedGroups.length > 0 ?
                    props.composedGroups.map(composedGroup => {
                        return <ContactGroupComposedGroupItem
                            key={composedGroup.id}
                            composedGroup={composedGroup}
                            contactGroupId={props.contactGroupId}
                        />;
                    })
                    :
                    <div>Geen samengestelde groepen bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        composedGroups: state.contactGroupDetails.composedGroups,
        contactGroupId: state.contactGroupDetails.id,
    };
};
export default connect(mapStateToProps)(ContactGroupComposedGroupsList);

