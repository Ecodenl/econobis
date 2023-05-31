import React, {useEffect, useState} from 'react';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";
import Icon from "react-icons-kit";
import PanelBody from "../../../components/panel/PanelBody";
import {plus} from 'react-icons-kit/fa/plus';
import {trash} from 'react-icons-kit/fa/trash';
import InputMultiSelect from "../../../components/form/InputMultiSelect";
import Modal from "../../../components/modal/Modal";
import {default as Dropzone} from "react-dropzone";
import DocumentsAPI from "../../../api/document/DocumentsAPI";
import EmailAttachmentAPI from "../../../api/email/EmailAttachmentAPI";
import PdfViewer from "../../../components/pdf/PdfViewer";
import {eye} from 'react-icons-kit/fa/eye';
import {download} from 'react-icons-kit/fa/download';
import fileDownload from "js-file-download";

export default function EmailSendModalAttachments({email, updated}) {
    const [showSelectDocumentModal, setShowSelectDocumentModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [deletingAttachmentId, setDeletingAttachmentId] = useState(0);
    const [selectableDocuments, setSelectableDocuments] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [viewedAttachment, setViewedAttachment] = useState(null);

    useEffect(() => {
        if (showSelectDocumentModal && selectableDocuments === false) {
            DocumentsAPI.fetchDocumentsPeek().then(payload => {
                setSelectableDocuments(payload);
            });
        }
    }, [showSelectDocumentModal]);

    const addSelectedDocumentsAsAttachments = () => {
        if (selectedDocuments.length > 0) {
            EmailAttachmentAPI.addDocumentsAsAttachments(email.id, selectedDocuments.map(d => d.id)).then(() => {
                setSelectedDocuments([]);
                setShowSelectDocumentModal(false);
                updated();
            });
        }
    }

    const deleteAttachment = () => {
        EmailAttachmentAPI.delete(deletingAttachmentId).then(() => {
            setDeletingAttachmentId(0);
            updated();
        });
    }

    const dropAcceptedHandler = async (files) => {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);

            await EmailAttachmentAPI.store(email.id, formData);
        }

        setShowUploadModal(false);

        updated();
    };

    const isImage = (attachment) => {
        return attachment.name.toLowerCase().endsWith('.jpg')
            || attachment.name.toLowerCase().endsWith('.png');
    }

    const isPdf = (attachment) => {
        return attachment.name.toLowerCase().endsWith('.pdf');
    }

    const viewItem = (attachment) => {
        EmailAttachmentAPI.downloadAttachment(attachment.id).then(payload => {
            let item = isPdf(attachment) ? payload.data : URL.createObjectURL(payload.data);
            setViewedAttachment({
                ...attachment,
                item: item,
            })
        });
    };

    const downloadItem = (attachment) => {
        EmailAttachmentAPI.downloadAttachment(attachment.id).then(payload => {
            fileDownload(payload.data, attachment.name);
        });
    };

    return (
        <>
            {showSelectDocumentModal && selectableDocuments !== false && (
                <Modal
                    buttonConfirmText="Toevoegen als bijlage"
                    closeModal={() => setShowSelectDocumentModal(false)}
                    confirmAction={addSelectedDocumentsAsAttachments}
                    title="Selecteer document(en)"
                    modalMainClassName="submodal"
                >
                    <div className="row">
                        <div className="col-sm-12">
                            <InputMultiSelect
                                label={'Document(en)'}
                                name={'selectedDocuments'}
                                value={selectedDocuments}
                                onChangeAction={setSelectedDocuments}
                                options={selectableDocuments}
                                optionId={'id'}
                                optionName={'filename'}
                                placeholder={''}
                                size={'col-sm-9'}
                            />
                        </div>
                    </div>
                </Modal>
            )}

            <div className="row">
                <div className="form-group col-sm-12">

                    <Panel>
                        <PanelHeader>
                            <span className="h5 text-bold">Bijlagen</span>
                            <div className="nav navbar-nav btn-group pull-right" role="group">
                                <button className="btn btn-link" data-toggle="dropdown">
                                    <Icon size={14} icon={plus}/>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="btn" onClick={() => setShowSelectDocumentModal(true)}>
                                            Kies een document
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn" onClick={() => setShowUploadModal(true)}>
                                            Upload bijlage
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </PanelHeader>
                        <PanelBody>
                            <div className="col-md-12">
                                <div className="row border header">
                                    <div className="col-sm-11">Bestand</div>
                                    <div className="col-sm-1"/>
                                </div>
                                {email.attachments.length > 0 ? (
                                    email.attachments.map(attachment => {
                                        return (
                                            <div
                                                className={`row border`}
                                                key={attachment.id}
                                            >
                                                <div className="col-sm-11">{attachment.name}</div>
                                                <div className="col-sm-1">
                                                    <a role="button"
                                                       onClick={() => setDeletingAttachmentId(attachment.id)}>
                                                        <Icon className="mybtn-danger" size={14} icon={trash}/>
                                                    </a>
                                                    {(isImage(attachment) || isPdf(attachment)) && (
                                                        <a role="button" onClick={() => viewItem(attachment)}>
                                                            <Icon className="mybtn-success" size={14} icon={eye}/>
                                                        </a>
                                                    )}
                                                    <a role="button" onClick={() => downloadItem(attachment)}>
                                                        <Icon className="mybtn-success" size={14} icon={download}/>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>Geen bijlagen bekend.</div>
                                )}
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>

            {!!deletingAttachmentId && (
                <Modal
                    buttonConfirmText="Verwijder"
                    buttonClassName={'btn-danger'}
                    closeModal={() => setDeletingAttachmentId(0)}
                    confirmAction={deleteAttachment}
                    title="Verwijderen"
                    modalMainClassName="submodal"
                >
                    <p>Wil je deze bijlage verwijderen?</p>
                </Modal>
            )}

            {!!showUploadModal && (
                <Modal closeModal={() => setShowUploadModal(false)} showConfirmAction={false} title="Upload bestand"
                       modalMainClassName="submodal">
                    <div className="upload-file-content">
                        <Dropzone
                            className="dropzone"
                            onDropAccepted={dropAcceptedHandler}
                            onDropRejected={() => {
                            }}
                            maxSize={21495808}
                        >
                            <p>Klik hier voor het uploaden van een bestand</p>
                            <p>
                                <strong>of</strong> sleep het bestand hierheen
                            </p>
                        </Dropzone>
                    </div>
                </Modal>
            )}

            {viewedAttachment && (
                <Modal
                    closeModal={() => setViewedAttachment(null)}
                    modalClassName="modal-lg"
                    showConfirmAction={false}
                    buttonCancelText="Ok"
                    modalMainClassName="submodal"
                >
                    <div style={{maxHeight: 'calc(100vh - 300px)', overflow: 'auto'}}>
                        {
                            isPdf(viewedAttachment) ? (
                                <PdfViewer file={viewedAttachment.item}/>
                            ) : (
                                <img className={'img-responsive'} src={viewedAttachment.item} alt={name}/>
                            )
                        }
                    </div>
                </Modal>
            )}
        </>
    );
}

