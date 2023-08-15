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

export default function MailgunDomainDetailsComplaints({mailgunDomainId}) {
    const [isLoading, setLoading] = useState(true);
    const [showNew, setShowNew] = useState(false);
    const [deletingComplaint, setDeletingComplaint] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [newComplaint, setNewComplaint] = useState({
        address: '',
    });

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);

        return axiosInstance.get('/mailgun-domain/' + mailgunDomainId + '/complaint').then(response => {
            setComplaints(response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }));
            setLoading(false);
        }).catch(() => {
            setErrorText('Er is iets misgegaan met ophalen van de mailgun complaints.');
            setLoading(false);
        });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();

        return axiosInstance.post('/mailgun-domain/' + mailgunDomainId + '/complaint', {
            address: newComplaint.address,
        }).then(() => {
            setShowNew(false);
            setNewComplaint({
                address: '',
            });
            fetch();
        }).catch(() => {
            alert('Er is iets misgegaan met opslaan.');
        });
    }

    const handleDeleteSubmit = () => {
        return axiosInstance.post('/mailgun-domain/' + mailgunDomainId + '/complaint/' + deletingComplaint.address + '/delete').then(() => {
            setDeletingComplaint(null);
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

        if (complaints.length === 0) {
            return 'Geen mailgun complaints gevonden!';
        }

        return '';
    }

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Complaints</span>
                <a role="button" className="pull-right" onClick={() => setShowNew(true)}>
                    <Icon size={14} icon={plus}/>
                </a>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <div>
                        <div className="row border header">
                            <div className="col-sm-8">E-mail</div>
                            <div className="col-sm-3">Datum</div>
                            <div className="col-sm-1"/>
                        </div>
                        {complaints.length > 0 ? (
                            complaints.map(complaint => (
                                <div
                                    className={`row border`}
                                >
                                    <div className="col-sm-8">{complaint.address}</div>
                                    <div className="col-sm-3">{complaint.date}</div>
                                    <div className="col-sm-1">
                                        <a role="button" onClick={() => setDeletingComplaint(complaint)}>
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
                                            value={newComplaint.address}
                                            onChangeAction={e => setNewComplaint({...newComplaint, address: e.target.value})}
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

            {deletingComplaint && (
                <Modal
                    buttonConfirmText="Verwijder"
                    buttonClassName={'btn-danger'}
                    closeModal={() => setDeletingComplaint(null)}
                    confirmAction={() => handleDeleteSubmit()}
                    title="Verwijderen"
                >
                    <p>Wil je dit complaintadres verwijderen?</p>
                </Modal>
            )}
        </Panel>
    );
}