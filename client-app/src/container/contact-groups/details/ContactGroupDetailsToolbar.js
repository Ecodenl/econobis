import React, { useState } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactGroupDetailsDelete from './ContactGroupDetailsDelete';
import ButtonText from '../../../components/button/ButtonText';
import ContactGroupDetailsLapostaList from '../../contact-groups/details/ContactGroupDetailsLapostaList';
import { useNavigate } from 'react-router-dom';
import ContactGroupDetailsLapostaListDeActivate from './ContactGroupDetailsLapostaListDeActivate';
import ContactGroupDetailsLapostaListConfirmDeActivate from './ContactGroupDetailsLapostaListConfirmDeActivate';

function ContactGroupDetailsToolbar({
    permissions,
    contactGroup,
    cooperation,
    isLoading,
    callFetchContactGroupDetails,
}) {
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [showSyncLapostaList, setShowSyncLapostaList] = useState(false);
    const [showDeActivateLapostaListConfirm, setShowDeActivateLapostaListConfirm] = useState(false);
    const [showDeActivateLapostaList, setShowDeActivateLapostaList] = useState(false);

    function toggleDelete() {
        setShowDelete(!showDelete);
    }

    function toggleShowSyncLapostaList() {
        if (showSyncLapostaList) {
            callFetchContactGroupDetails();
        }
        setShowSyncLapostaList(!showSyncLapostaList);
    }
    function showModalDeActivateLapostaListConfirm() {
        setShowDeActivateLapostaListConfirm(true);
    }
    function closeModalDeActivateLapostaListConfirm() {
        setShowDeActivateLapostaListConfirm(false);
    }
    function confirmDeActivate() {
        closeModalDeActivateLapostaListConfirm();
        setShowDeActivateLapostaList(true);
    }
    function closeDeActivateLapostaList() {
        if (showDeActivateLapostaList) {
            callFetchContactGroupDetails();
        }
        setShowDeActivateLapostaList(false);
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
                        <div className="col-md-3">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                                {permissions.manageGroup &&
                                    !contactGroup.isUsedInComposedGroup &&
                                    !contactGroup.isUsedInExceptedGroup && (
                                        <ButtonIcon iconName={'trash'} onClickAction={toggleDelete} />
                                    )}
                                <ButtonText
                                    buttonText={`Open lijst (${numberOfContacts})`}
                                    onClickAction={() => navigate(`/contacten-in-groep/${id}`)}
                                />
                                {permissions.manageMarketing && cooperation && cooperation.use_laposta && (
                                    <>
                                        <br /> <br />
                                        <ButtonText
                                            onClickAction={toggleShowSyncLapostaList}
                                            buttonText={
                                                !contactGroup.isUsedInLaposta
                                                    ? 'LaPosta lijst aanmaken'
                                                    : !contactGroup.groupUpToDateWithLaposta
                                                    ? 'LaPosta lijst bijwerken'
                                                    : 'LaPosta lijst actueel'
                                            }
                                            disabled={Boolean(
                                                contactGroup.isUsedInLaposta && contactGroup.groupUpToDateWithLaposta
                                            )}
                                            buttonClassName={
                                                contactGroup.isUsedInLaposta && !contactGroup.groupUpToDateWithLaposta
                                                    ? 'btn-danger'
                                                    : 'btn-success'
                                            }
                                        />
                                        {Boolean(contactGroup.isUsedInLaposta) && (
                                            <ButtonText
                                                onClickAction={showModalDeActivateLapostaListConfirm}
                                                buttonText={`LaPosta lijst uitzetten`}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4 className="text-center">
                                {name} {composedOfType}
                            </h4>
                        </div>
                        <div className="col-md-3" />
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
            {showSyncLapostaList && <ContactGroupDetailsLapostaList closeModal={toggleShowSyncLapostaList} />}
            {showDeActivateLapostaListConfirm && (
                <ContactGroupDetailsLapostaListConfirmDeActivate
                    closeConfirmModal={closeModalDeActivateLapostaListConfirm}
                    confirmDeActivate={confirmDeActivate}
                    name={name}
                />
            )}
            {showDeActivateLapostaList && (
                <ContactGroupDetailsLapostaListDeActivate closeModal={closeDeActivateLapostaList} />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        contactGroup: state.contactGroupDetails,
        cooperation: state.systemData.cooperation,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ContactGroupDetailsToolbar);
