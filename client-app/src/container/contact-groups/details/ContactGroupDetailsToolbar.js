import React, { useState } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactGroupDetailsDelete from './ContactGroupDetailsDelete';
import ButtonText from '../../../components/button/ButtonText';
import ContactGroupDetailsLapostaList from '../../contact-groups/details/ContactGroupDetailsLapostaList';
import { hashHistory } from 'react-router';

function ContactGroupDetailsToolbar({ permissions, contactGroup, lapostaListId, cooperation, isLoading }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showCreateLapostaList, setShowCreateLapostaList] = useState(false);

    function toggleDelete() {
        setShowDelete(!showDelete);
    }

    function toggleShowCreateLapostaList() {
        setShowCreateLapostaList(!showCreateLapostaList);
    }

    const { id, name, type, numberOfContacts = 0, composedOf } = contactGroup;
    let composedOfType = '';
    if (composedOf === 'contacts') {
        composedOfType = '(Contacten)';
    } else if (composedOf === 'participants') {
        composedOfType = '(Participanten)';
    } else if (composedOf === 'both') {
        composedOfType = '(Samengesteld)';
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                                {permissions.manageGroup && !contactGroup.isUsedInComposedGroup && (
                                    <ButtonIcon iconName={'glyphicon-trash'} onClickAction={toggleDelete} />
                                )}
                                <ButtonText
                                    buttonText={`Open lijst (${numberOfContacts})`}
                                    onClickAction={() => hashHistory.push(`/contacten-in-groep/${id}`)}
                                />
                                {cooperation && cooperation.use_laposta && (
                                    <ButtonText
                                        onClickAction={toggleShowCreateLapostaList}
                                        buttonText={
                                            contactGroup.isUsedInLaposta
                                                ? 'Laposta lijst bijwerken'
                                                : 'Laposta lijst aanmaken'
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4 className="text-center">
                                {name}
                                {composedOfType}
                            </h4>
                        </div>
                        <div className="col-md-2" />
                    </PanelBody>
                </Panel>
            </div>
            {showDelete && (
                <ContactGroupDetailsDelete
                    closeDeleteItemModal={toggleDelete}
                    name={name}
                    id={id}
                    contactGroupType={type.id}
                />
            )}
            {showCreateLapostaList && <ContactGroupDetailsLapostaList closeModal={toggleShowCreateLapostaList} />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        contactGroup: state.contactGroupDetails,
        lapostaListId: state.contactGroupDetails.lapostaListId,
        cooperation: state.systemData.cooperation,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ContactGroupDetailsToolbar);
