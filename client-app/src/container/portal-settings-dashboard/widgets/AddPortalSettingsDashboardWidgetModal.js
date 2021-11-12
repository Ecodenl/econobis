import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal/Modal';
import InputText from '../../../components/form/InputText';
import InputTextArea from '../../../components/form/InputTextarea';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import { Col } from 'react-bootstrap';

const AddPortalSettingsDashboardWidgetModal = ({ title, toggleModal }) => {
    const [widget, setWidget] = useState({
        id: '',
        order: '',
        image: '',
        title: '',
        text: '',
        buttonText: '',
        buttonLink: '',
    });

    function addWidgetAction() {
        if (!Object.values(widget).join('')) {
            alert('Vul alle velden in.');
            return;
        }

        PortalSettingsDashboardAPI.addDashboardWidget(widget)
            .then(response => {
                console.log(response.data);
                toggleModal();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleInputChange(e) {
        setWidget({
            ...widget,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Modal
            closeModal={toggleModal}
            showConfirmAction={true}
            title={title}
            buttonConfirmText={'Toevoegen'}
            confirmAction={addWidgetAction}
        >
            <div className={'row'}>
                <Col sm={8}>
                    <InputText
                        divSize={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'ID'}
                        name={'id'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={4}>
                    <InputText
                        divSize={'col-sm-12'}
                        size={'col-sm-12'}
                        type={'number'}
                        min={'3'}
                        label={'Volgorde'}
                        name={'order'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={12}>
                    <InputText
                        divSize={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Titel'}
                        name={'title'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={12} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <InputTextArea
                        sizeInput={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Tekst'}
                        name={'text'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={5}>
                    <InputText
                        divSize={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Knoptekst'}
                        name={'buttonText'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={7}>
                    <InputText
                        divSize={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Knoplink'}
                        name={'buttonLink'}
                        onChangeAction={handleInputChange}
                    />
                </Col>
            </div>
        </Modal>
    );
};

AddPortalSettingsDashboardWidgetModal.defaultProps = {
    title: 'Widget toevoegen',
};

AddPortalSettingsDashboardWidgetModal.propTypes = {
    title: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
};

export default AddPortalSettingsDashboardWidgetModal;
