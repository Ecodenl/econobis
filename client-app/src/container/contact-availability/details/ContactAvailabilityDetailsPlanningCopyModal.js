import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import ButtonIcon from '../../../components/button/ButtonIcon';
import InputSelect from '../../../components/form/InputSelect';
import ContactAvailabilityAPI from '../../../api/contact/ContactAvailabilityAPI';

export default function ContactAvailabilityDetailsPlanningCopyModal({ weekOptions, copyFromWeek, contactId }) {
    const [showModal, setShowModal] = useState(false);
    const [copyToWeek, setCopyToWeek] = useState('');
    const [numberOfWeeks, setNumberOfWeeks] = useState(1);

    useEffect(() => {
        let currentIndex = weekOptions.findIndex(option => {
            return option.value === copyFromWeek;
        });

        let nextWeek = weekOptions[currentIndex + 1];

        setCopyToWeek(nextWeek ? nextWeek.value : copyFromWeek);
    }, [showModal]);

    const save = () => {
        ContactAvailabilityAPI.copyAvailabilities(contactId, {
            copyFromWeek: copyFromWeek,
            copyToWeek: copyToWeek,
            numberOfWeeks: numberOfWeeks,
        })
            .then(() => {
                setShowModal(false);
            })
            .catch(() => {
                alert('Er is iets misgegaan met opslaan, probeer het opnieuw.');
            });
    };

    const getNumberOfWeekOptions = () => {
        let currentIndex = weekOptions.findIndex(option => {
            return option.value === copyToWeek;
        });

        let max = weekOptions.length - currentIndex;

        let options = [];
        for (let i = 1; i <= max; i++) {
            options.push({ value: i, text: i });
        }
        return options;
    };

    if (showModal) {
        return (
            <div style={{ textAlign: 'left' }}>
                <Modal
                    buttonConfirmText="Kopiëren"
                    closeModal={() => setShowModal(false)}
                    confirmAction={save}
                    title="Beschikbaarheid kopiëren"
                >
                    <div>
                        <div className="row">
                            <div className={'col-sm-12'}>
                                <h4>
                                    Beschikbaarheid van{' '}
                                    <strong>{weekOptions.find(w => w.value === copyFromWeek).text}</strong> kopiëren.
                                </h4>
                                <p>
                                    De beschikbaarheid van de huidige week in het overzicht wordt gekopieerd naar de
                                    gekozen week en de x aantal daaropvolgende weken.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row">
                                <InputSelect
                                    label={'Naar week'}
                                    size={'col-sm-12'}
                                    name={'copyToWeek'}
                                    options={weekOptions}
                                    value={copyToWeek}
                                    onChangeAction={event => setCopyToWeek(event.target.value)}
                                    optionName={'text'}
                                    optionValue={'value'}
                                    emptyOption={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row">
                                <InputSelect
                                    label={'Aantal weken'}
                                    size={'col-sm-12'}
                                    name={'numberOfWeeks'}
                                    options={getNumberOfWeekOptions()}
                                    value={numberOfWeeks}
                                    onChangeAction={event => setNumberOfWeeks(event.target.value)}
                                    optionName={'text'}
                                    optionValue={'value'}
                                    emptyOption={false}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <ButtonIcon iconName={'copy'} buttonClassName="btn-default btn-sm" onClickAction={() => setShowModal(true)} />
    );
}
