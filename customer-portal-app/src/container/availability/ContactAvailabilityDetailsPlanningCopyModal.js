import React, {useEffect, useState} from 'react';
import Modal from '../../components/modal/Modal';
import ContactAvailabilityAPI from "../../api/portal-user/ContactAvailabilityAPI";
import {Button} from "react-bootstrap";
import {FaCopy} from "react-icons/fa";

export default function ContactAvailabilityDetailsPlanningCopyModal({weekOptions, copyFromWeek}) {
    const [showModal, setShowModal] = useState(false);
    const [copyToWeek, setCopyToWeek] = useState('');
    const [numberOfWeeks, setNumberOfWeeks] = useState(1);

    useEffect(() => {
        let currentIndex = weekOptions.findIndex((option) => {
            return option.value === copyFromWeek;
        });

        let nextWeek = weekOptions[currentIndex + 1];

        setCopyToWeek(nextWeek ? nextWeek.value : copyFromWeek);
    }, [showModal]);

    const save = () => {
        ContactAvailabilityAPI.copyAvailabilities({
            copyFromWeek: copyFromWeek,
            copyToWeek: copyToWeek,
            numberOfWeeks: numberOfWeeks,
        }).then(() => {
            setShowModal(false);
        }).catch(() => {
            alert('Er is iets misgegaan met opslaan, probeer het opnieuw.');
        });
    };

    const getNumberOfWeekOptions = () => {
        let currentIndex = weekOptions.findIndex((option) => {
            return option.value === copyToWeek;
        });

        let max = weekOptions.length - currentIndex;

        let options = [];
        for (let i = 1; i <= max; i++) {
            options.push({value: i, text: i});
        }
        return options;
    }

    if (showModal) {
        return (
            <div style={{textAlign: 'left'}}>
                <Modal
                    buttonConfirmText="Kopiëren"
                    closeModal={() => setShowModal(false)}
                    confirmAction={save}
                    title="Beschikbaarheid kopiëren"
                >
                    <div>
                        <div className="row">
                            <div className={'col-sm-12'}>
                                <p>Beschikbaarheid van <strong>{weekOptions.find(w => w.value === copyFromWeek).text }</strong> kopiëren.</p>
                                <p>De beschikbaarheid van de huidige week in het overzicht wordt gekopieerd naar de gekozen week en de x aantal daaropvolgende weken.</p>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className={'col-sm-6'}>
                                <label>Maar week</label>
                            </div>
                            <div className={'col-sm-6'}>
                                <select
                                    className="form-control input-sm"
                                    value={copyToWeek}
                                    onChange={(event) => setCopyToWeek(event.target.value)}
                                >
                                    {weekOptions.map(option => {
                                        return (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'col-sm-6'}>
                                <label>Aantal weken</label>
                            </div>
                            <div className={'col-sm-6'}>
                                <select
                                    className="form-control input-sm"
                                    value={numberOfWeeks}
                                    onChange={(event) => setNumberOfWeeks(event.target.value)}
                                >
                                    {getNumberOfWeekOptions().map(option => {
                                        return (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <Button className={'btn-light btn-sm'} onClick={() => setShowModal(true)}>
            <FaCopy />
        </Button>
    );
}