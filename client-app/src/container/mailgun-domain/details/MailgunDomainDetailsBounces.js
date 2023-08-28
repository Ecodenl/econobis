import React, {useEffect, useState} from 'react';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";
import Icon from "react-icons-kit";
import PanelBody from "../../../components/panel/PanelBody";
import {plus} from 'react-icons-kit/fa/plus';
import {trash} from 'react-icons-kit/fa/trash';
import axiosInstance from "../../../api/default-setup/AxiosInstance";
import ButtonText from "../../../components/button/ButtonText";
import InputText from "../../../components/form/InputText";
import Modal from "../../../components/modal/Modal";
import {FaInfoCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

export default function MailgunDomainDetailsBounces({mailgunDomainId}) {
    const [isLoading, setLoading] = useState(true);
    const [showNew, setShowNew] = useState(false);
    const [deletingBounce, setDeletingBounce] = useState(null);
    const [bounces, setBounces] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [newBounce, setNewBounce] = useState({
        address: '',
        error: '',
    });

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        return axiosInstance.get('/mailgun-domain/' + mailgunDomainId + '/bounce').then(response => {
            setBounces(response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }));
            setLoading(false);
        }).catch(() => {
            setErrorText('Er is iets misgegaan met ophalen van de mailgun bounces.');
            setLoading(false);
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();

        return axiosInstance.post('/mailgun-domain/' + mailgunDomainId + '/bounce', {
            address: newBounce.address,
            error: newBounce.error,
        }).then(() => {
            setShowNew(false);
            setNewBounce({
                address: '',
                error: '',
            });
            fetch();
        }).catch(() => {
            alert('Er is iets misgegaan met opslaan.');
        });
    }

    const handleDeleteSubmit = () => {
        return axiosInstance.post('/mailgun-domain/' + mailgunDomainId + '/bounce/' + deletingBounce.address + '/delete').then(() => {
            setDeletingBounce(null);
            fetch();
        }).catch(() => {
            alert('Er is iets misgegaan met verwijderen.');
        });
    }

    const loadingText = () => {
        if (errorText) {
            return errorText;
        }

        if (isLoading) {
            return 'Gegevens aan het laden.';
        }

        if (bounces.length === 0) {
            return 'Geen mailgun bounces gevonden!';
        }

        return '';
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">
                    Bounces &nbsp;
                    <FaInfoCircle
                        color={'blue'}
                        size={'15px'}
                        data-tip={"Deze lijst toont e-mailadressen waar Mailgun geen e-mail kon bezorgen." +
                            "<br>Mailgun stuurt geen e-mail meer aan dit adres, om jouw e-mail reputatie te beschermen." +
                            "<br>Als je een regel uit deze lijst verwijdert d.m.v. het prullenbakje stuurt Mailgun weer e-mail aan dit adres." +
                            "<br>Let op: Doe dit alleen bij e-mailadressen waarvan je weet dat ze weer bereikbaar zijn!"}
                        data-for={`tooltip-note`}
                    />
                    <ReactTooltip
                        id={`tooltip-note`}
                        effect="float"
                        place="right"
                        multiline={true}
                        aria-haspopup="true"
                    />
                </span>
                <a role="button" className="pull-right" onClick={() => setShowNew(true)}>
                    <Icon size={14} icon={plus}/>
                </a>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <div>
                        <div className="row border header">
                            <div className="col-sm-4">E-mail</div>
                            <div className="col-sm-4">Omschrijving</div>
                            <div className="col-sm-3">Datum</div>
                            <div className="col-sm-1"/>
                        </div>
                        {bounces.length > 0 ? (
                            bounces.map(bounce => (
                                <div
                                    className={`row border`}
                                >
                                    <div className="col-sm-4">{bounce.address}</div>
                                    <div className="col-sm-4">{bounce.error}</div>
                                    <div className="col-sm-3">{bounce.date}</div>
                                    <div className="col-sm-1">
                                        <a role="button" onClick={() => setDeletingBounce(bounce)}>
                                            <Icon className="mybtn-danger" size={14} icon={trash}/>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>{loadingText()}</div>
                        )}
                    </div>
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && (
                        <form className="form-horizontal" onSubmit={handleAddSubmit}>
                            <Panel className={'panel-grey'}>
                                <PanelBody>
                                    <div className="row">
                                        <InputText
                                            label={'E-mail'}
                                            name={'address'}
                                            value={newBounce.address}
                                            onChangeAction={e => setNewBounce({...newBounce, address: e.target.value})}
                                        />
                                        <InputText
                                            label={'Omschrijving'}
                                            name={'error'}
                                            value={newBounce.error}
                                            onChangeAction={e => setNewBounce({...newBounce, error: e.target.value})}
                                        />
                                    </div>

                                    <div className="pull-right btn-group" role="group">
                                        <ButtonText
                                            buttonClassName={'btn-default'}
                                            buttonText={'Annuleren'}
                                            onClickAction={() => setShowNew(false)}
                                        />
                                        <ButtonText
                                            buttonText={'Opslaan'}
                                            onClickAction={handleAddSubmit}
                                            type={'submit'}
                                            value={'Submit'}
                                        />
                                    </div>
                                </PanelBody>
                            </Panel>
                        </form>
                    )}
                </div>
            </PanelBody>

            {deletingBounce && (
                <Modal
                    buttonConfirmText="Verwijder"
                    buttonClassName={'btn-danger'}
                    closeModal={() => setDeletingBounce(null)}
                    confirmAction={() => handleDeleteSubmit()}
                    title="Verwijderen"
                >
                    <p>Wil je dit bounceadres verwijderen?</p>
                </Modal>
            )}
        </Panel>
    );
}