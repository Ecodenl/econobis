import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContact } from '../../../actions/contact/ContactDetailsActions';

const ContactDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteContact(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>
                Verwijder contact ({`${props.type.name}`}): <strong> {`${props.fullName}`} </strong>
            </p>
            {props.numberOfActions > 0 ? (
                <>
                    <p>
                        Er {props.numberOfActions == 1 ? `is` : `zijn`} nog{' '}
                        <strong>{`${props.numberOfActions}`}</strong> gekoppelde Acties op kans voor deze{' '}
                        <strong>{`${props.type.name}`}</strong>.
                    </p>
                    <p>
                        <span className="error-span">
                            {props.isOrganisationOrCoach
                                ? `Deze gekoppelde Acties op kans zullen ontkoppeld worden!`
                                : props.inspectionPersonTypeId === 'projectmanager'
                                ? `Contact is projectleider bij deze Acties op kans en zal hiervan ontkoppeld worden.`
                                : props.inspectionPersonTypeId === 'externalparty'
                                ? `Contact is externe partij bij deze Acties op kans en zal hiervan ontkoppeld worden.`
                                : `Onbekende koppeling met Acties op kans`}
                        </span>
                    </p>
                </>
            ) : null}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContact: id => {
        dispatch(deleteContact(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsDelete);
