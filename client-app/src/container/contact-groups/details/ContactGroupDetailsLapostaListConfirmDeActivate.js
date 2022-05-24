import React from 'react';

import Modal from '../../../components/modal/Modal';

const ContactGroupDetailsConfirmDeActivate = props => {
    return (
        <Modal
            buttonConfirmText="Bevestig"
            buttonClassName={'btn-danger'}
            closeModal={props.closeConfirmModal}
            confirmAction={props.confirmDeActivate}
            title="Bevestig uitzetten LaPosta"
        >
            <span>
                LaPosta uitzetten voor Groep <strong>{props.name}</strong>?
                <br />
                De koppeling met LaPosta lijst wordt uitgezet voor deze groep en alle gekoppelde contacten. Hierna is er
                geen synchronisatie meer mogelijk met deze LaPosta lijst. De lijst blijft wel bestaan in LaPosta. Als je
                hierna weer kiest voor 'LaPosta lijst aanmaken' dan zal er een nieuwe lijst in LaPosta aangemaakt
                worden.
            </span>
        </Modal>
    );
};

export default ContactGroupDetailsConfirmDeActivate;
