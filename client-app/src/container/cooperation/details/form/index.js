import React, { useState } from 'react';
import { connect } from 'react-redux';
import CooperationDetailsFormView from './View';
import CooperationDetailsFormEdit from './Edit';

function CooperationDetailsForm({ formData, permissions }) {
    const [showEdit, setShowEdit] = useState(false);

    function toggleEdit() {
        setShowEdit(!showEdit);
    }

    return (
        <>
            {showEdit && permissions.manageCooperationSettings ? (
                <CooperationDetailsFormEdit formData={formData} toggleEdit={toggleEdit} />
            ) : (
                <CooperationDetailsFormView formData={formData} toggleEdit={toggleEdit} />
            )}
        </>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CooperationDetailsForm);
