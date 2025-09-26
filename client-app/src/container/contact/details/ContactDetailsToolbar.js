import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { deleteContact } from '../../../actions/contact/ContactDetailsActions';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactDetailsDelete from './ContactDetailsDelete';
import ButtonText from '../../../components/button/ButtonText';
import ContactDetailsHoomdossier from './ContactDetailsHoomdossier';
import { Link } from 'react-router-dom';

function ContactDetailsToolbar({
    permissions,
    type,
    fullName,
    id,
    hoomAccountId,
    isOrganisationOrCoach,
    inspectionPersonTypeId,
    numberOfActions,
    cooperation,
    isLoading,
    occupations,
}) {
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [showMakeHoomdossier, setShowMakeHoomdossier] = useState(false);

    function showDeleteModal() {
        setShowDelete(true);
    }

    function hideDeleteModal() {
        setShowDelete(false);
        navigate('/contacten');
    }

    function toggleShowMakeHoomdossier() {
        setShowMakeHoomdossier(!showMakeHoomdossier);
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group btn-group-flex margin-small" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                {type &&
                                    type.id === 'organisation' &&
                                    permissions &&
                                    permissions.deleteOrganisation && (
                                        <ButtonIcon iconName={'trash'} onClickAction={showDeleteModal} />
                                    )}
                                {type && type.id === 'person' && permissions && permissions.deletePerson && (
                                    <ButtonIcon iconName={'trash'} onClickAction={showDeleteModal} />
                                )}
                                {type &&
                                type.id === 'person' &&
                                permissions.createHoomDossier &&
                                cooperation &&
                                !isEmpty(cooperation.hoom_link) ? (
                                    <ButtonText
                                        onClickAction={toggleShowMakeHoomdossier}
                                        buttonText={hoomAccountId ? 'Hoomdossier aangemaakt' : 'Hoomdossier aanmaken'}
                                        disabled={Boolean(hoomAccountId)}
                                    />
                                ) : null}
                            </div>
                        </div>
                        {!isLoading && (
                            <>
                                <div className="col-md-4">
                                    <h4 className="text-center text-success margin-small">
                                        <strong>
                                            {fullName || 'Nieuw'} ({type && type.name})
                                        </strong>
                                    </h4>
                                </div>
                                <div className="col-md-4 text-right align-middle">
                                    {occupations
                                        ? occupations.map(s =>
                                              s.primary ? (
                                                  <Link
                                                      to={`/contact/${s.primaryContact.id}`}
                                                      className="link-underline margin-10-right"
                                                  >
                                                      {s.primaryContact.fullName}
                                                  </Link>
                                              ) : null
                                          )
                                        : null}
                                </div>
                            </>
                        )}
                    </PanelBody>
                </Panel>
            </div>

            {showDelete && (
                <ContactDetailsDelete
                    closeDeleteItemModal={hideDeleteModal}
                    type={type}
                    fullName={fullName}
                    id={id}
                    isOrganisationOrCoach={isOrganisationOrCoach}
                    inspectionPersonTypeId={inspectionPersonTypeId}
                    numberOfActions={numberOfActions}
                />
            )}
            {showMakeHoomdossier && <ContactDetailsHoomdossier closeModal={toggleShowMakeHoomdossier} />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        fullName: state.contactDetails.fullName,
        id: state.contactDetails.id,
        type: state.contactDetails.type,
        hoomAccountId: state.contactDetails.hoomAccountId,
        isOrganisationOrCoach: state.contactDetails.isOrganisationOrCoach,
        inspectionPersonTypeId: state.contactDetails.inspectionPersonTypeId,
        numberOfActions: state.contactDetails.numberOfActions,
        cooperation: state.systemData.cooperation,
        permissions: state.meDetails.permissions,
        isLoading: state.loadingData.isLoading,
        occupations: state.contactDetails.occupations,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteContact: id => {
        dispatch(deleteContact(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsToolbar);
