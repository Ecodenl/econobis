import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactGroup } from '../../../actions/contact/ContactGroupsActions';
import { useNavigate } from 'react-router-dom';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';

const ContactGroupDetailsDelete = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        props.deleteContactGroup(props.id, successAction);
        props.closeDeleteItemModal();
    };

    const successAction = () => {
        props.fetchSystemData();
        navigate(`/contact-groepen`);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            {props.contactGroupType === 'static' ? (
                <span>
                    Je gaat een statische groep verwijderen. Deze groep kan je niet meer herstellen. Weet je zeker dat
                    de deze statische groep <strong>{props.name}</strong> wilt verwijderen?
                </span>
            ) : (
                <span>
                    Verwijder groep: <strong>{props.name}</strong>
                </span>
            )}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactGroup: (id, successAction) => {
        dispatch(deleteContactGroup(id, successAction));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(null, mapDispatchToProps)(ContactGroupDetailsDelete);
