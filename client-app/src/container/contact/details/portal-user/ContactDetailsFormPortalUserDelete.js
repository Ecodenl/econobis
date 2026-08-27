import React from 'react';

import Modal from '../../../../components/modal/Modal';
import { deletePortalUser } from '../../../../actions/contact/ContactDetailsActions';
import { connect } from 'react-redux';

const ContactDetailsFormPortalUserDelete = props => {
    const confirmAction = () => {
        props.deletePortalUser(props.portalUser.id);
        props.closeDeleteItemModal();
    };
    let allowDelete = false;
    if (!props.primary || (props.numberOfEmailAddresses && props.numberOfEmailAddresses === 1)) {
        allowDelete = true;
    }

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Verwijder portal gebruiker</p>
            <p>
                <strong>Let op:</strong> als je een portal gebruiker inlog verwijderd worden ook de koppelingen met alle
                bestanden die deze gebruiker heeft ge-upload verwijderd. Deze gebruiker kan dan niet zelf meer zijn
                ge-uploade bestanden verwijderen bij een eventuele nieuw portal gebruiker inlog en kunnen wij achteraf
                ook niet meer achterhalen welke portal gebruiker betreffende document(en) heeft ge-upload. Mocht de
                inlog van deze gebruiker veranderd zijn kan je ook het inlog emailadres aanpassen in plaats van
                verwijderen.
            </p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

const mapDispatchToProps = dispatch => ({
    deletePortalUser: id => {
        dispatch(deletePortalUser(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPortalUserDelete);
