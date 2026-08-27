import React, { useState } from 'react';
import InvoicePostAPI from '../../../../api/invoice/InvoicePostAPI';
import ErrorModal from '../../../../components/modal/ErrorModal';
import fileDownload from 'js-file-download';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { fileO } from 'react-icons-kit/fa/fileO';
// import InvoicePostDelete from './InvoicePostDelete';

function InvoicePostItem({ invoicePost }) {
    const [showActionButtons, setShowActionButtuns] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');
    // const [showDelete, setShowDelete] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState(false);

    function onLineEnter() {
        setShowActionButtuns(true);
        setHighlightLine('highlight-row');
    }

    function onLineLeave() {
        setShowActionButtuns(false);
        setHighlightLine('');
    }

    function clickItem(invoicePostId) {
        downloadInvoicePost(invoicePostId);
    }

    function downloadInvoicePost(invoicePostId) {
        InvoicePostAPI.download(invoicePostId).then(payload => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    }

    // function deleteProject() {
    //     InvoicePostAPI.deleteInvoicePost(invoicePost.id)
    //         .then(payload => {
    //             toggleDelete();
    //         })
    //         .catch(error => {
    //             let errorObject = JSON.parse(JSON.stringify(error));
    //             let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
    //             if (errorObject.response.status !== 500) {
    //                 errorMessage = errorObject.response.data.message;
    //             }
    //             setShowErrorModal(true);
    //             setModalErrorMessage(errorMessage);
    //         });
    // }
    //

    // function toggleDelete() {
    //     setShowDelete(!showDelete);
    // }

    function closeErrorModal() {
        setShowErrorModal(false);
        setModalErrorMessage('');
    }

    return (
        <React.Fragment>
            <tr
                className={`${highlightLine}`}
                onDoubleClick={() => clickItem(invoicePost.id)}
                onMouseEnter={() => onLineEnter()}
                onMouseLeave={() => onLineLeave()}
            >
                <td>{invoicePost.id}</td>
                <td>{invoicePost.name}</td>
                <td>{invoicePost.createdAt ? moment(invoicePost.createdAt).format('L') : ''}</td>
                <td>
                    {showActionButtons ? (
                        <>
                            <a role="button" onClick={() => downloadInvoicePost(invoicePost.id)}>
                                <Icon className="mybtn-success" size={14} icon={fileO} />
                                &nbsp;
                            </a>
                            {/*&nbsp;&nbsp;&nbsp;*/}
                            {/*<a className="btn btn-success btn-sm" role="button" onClick={toggleDelete}>*/}
                            {/*     <Icon size={14} icon={trash} />{' '}/}
                            {/*</a>*/}
                        </>
                    ) : (
                        ''
                    )}
                </td>
            </tr>

            {/*{showDelete && (*/}
            {/*    <InvoicePostDelete*/}
            {/*        invoicePost={invoicePost}*/}
            {/*        deleteProject={deleteProject}*/}
            {/*        closeDeleteItemModal={toggleDelete}*/}
            {/*    />*/}
            {/*)}*/}
            {showErrorModal && (
                <ErrorModal closeModal={closeErrorModal} title={'Fout bij opslaan'} errorMessage={modalErrorMessage} />
            )}
        </React.Fragment>
    );
}

export default InvoicePostItem;
