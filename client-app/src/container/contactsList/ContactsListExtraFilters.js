import React from 'react';

import Modal from '../../components/modal/Modal';

const ContactsListExtraFilters = (props) => {
    const closeModal = () => {
        props.toggleShowExtraFilters();
    };

    const confirmAction = () => {
        // Sent to database
        props.toggleShowExtraFilters();
    };

    return (
        <Modal
            title="Extra filters"
            buttonConfirmText="Toepassen"
            confirmAction={() => confirmAction()}
            closeModal={() => closeModal()}
        >
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-md-4">Zoekveld</th>
                        <th className="col-md-4"/>
                        <th className="col-md-4">Waarde</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="col-md-4"><select className="form-control input-sm"><option>Nieuwsbrief</option><option>Test2</option></select></td>
                        <td className="col-md-4"><select className="form-control input-sm"><option>gelijk aan</option><option>groter dan</option></select></td>
                        <td className="col-md-4"><select className="form-control input-sm"><option>Ja</option><option>Nee</option></select></td>
                    </tr>
                    <tr>
                        <td className="col-md-4"><select className="form-control input-sm"><option>Woonplaats</option></select></td>
                        <td className="col-md-4"><select className="form-control input-sm"><option>niet gelijk aan</option><option>groter dan</option></select></td>
                        <td className="col-md-4"><input type="text" className="form-control input-sm" value="Alkmaar"/></td>
                    </tr>
                    <tr>
                        <td className="col-md-4"><select className="form-control input-sm"><option>Nog een optie</option><option>Test2</option><option>Test3</option></select></td>
                        <td className="col-md-4"><select className="form-control input-sm"><option>groter dan</option><option>kleiner dan</option></select></td>
                        <td className="col-md-4"><input type="text" className="form-control input-sm" value="10"/></td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    )
};


export default ContactsListExtraFilters;
