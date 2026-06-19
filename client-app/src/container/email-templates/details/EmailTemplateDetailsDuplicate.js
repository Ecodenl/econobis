import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';

const EmailTemplateDetailsDuplicate = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        EmailTemplateAPI.duplicateTemplate(props.templateId).then(payload => {
            const id = payload.data.data.id;
            console.log(id);
            navigate(`/email-template/${id}`);
            props.closeModal();
        });
    };

    return (
        <Modal
            buttonConfirmText="Dupliceer"
            closeModal={props.closeModal}
            confirmAction={() => confirmAction()}
            title="Dupliceer template"
        >
            <p>
                Dupliceer template: <strong> {`${props.templateName}`} </strong>
            </p>
        </Modal>
    );
};

export default EmailTemplateDetailsDuplicate;
