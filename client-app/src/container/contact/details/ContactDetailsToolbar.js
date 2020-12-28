import React, { useState } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteContact } from '../../../actions/contact/ContactDetailsActions';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ContactDetailsDelete from './ContactDetailsDelete';
import ButtonText from '../../../components/button/ButtonText';
import ContactDetailsHoomdossier from './ContactDetailsHoomdossier';

function ContactDetailsToolbar({ permissions, type, fullName, id, hoomAccountId, isLoading }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showMakeHoomdossier, setShowMakeHoomdossier] = useState(false);

    function toggleDelete() {
        setShowDelete(!showDelete);
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
                                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                                {type &&
                                    type.id === 'organisation' &&
                                    permissions &&
                                    permissions.deleteOrganisation && (
                                        <ButtonIcon iconName={'glyphicon-trash'} onClickAction={toggleDelete} />
                                    )}
                                {type && type.id === 'person' && permissions && permissions.deletePerson && (
                                    <ButtonIcon iconName={'glyphicon-trash'} onClickAction={toggleDelete} />
                                )}
                                {type && type.id === 'person' ? (
                                    <ButtonText
                                        onClickAction={toggleShowMakeHoomdossier}
                                        buttonText={hoomAccountId ? 'Hoomdossier aangemaakt' : 'Hoomdossier aanmaken'}
                                        disabled={hoomAccountId}
                                    />
                                ) : null}
                            </div>
                        </div>
                        {!isLoading && (
                            <div className="col-md-4">
                                <h4 className="text-center text-success margin-small">
                                    <strong>
                                        {fullName || 'Nieuw'} ({type && type.name})
                                    </strong>
                                </h4>
                            </div>
                        )}
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>

            {showDelete && <ContactDetailsDelete closeDeleteItemModal={toggleDelete} fullName={fullName} id={id} />}
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
        permissions: state.meDetails.permissions,
        isLoading: state.loadingData.isLoading,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteContact: id => {
        dispatch(deleteContact(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsToolbar);
