import React, { useState } from 'react';
import { connect } from 'react-redux';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';

function CooperationDetailsForm({ initialDetails, permissions }) {
    const [showEdit, setShowEdit] = useState(false);
    //
    // function toggleDivEnter() {
    //     if (activeDiv) {
    //         setActiveDiv('');
    //     } else {
    //         setActiveDiv('panel-grey');
    //     }
    // }

    return (
        <div className={'panel-hover'}>
            {showEdit && permissions.manageCooperationSettings ? (
                <div>edit</div>
            ) : (
                <Panel>
                    <PanelBody>Test</PanelBody>
                </Panel>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        emailTemplates: state.emailTemplates,
        staticContactGroups: state.staticContactGroups,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(CooperationDetailsForm);
