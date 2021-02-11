import React, { useState } from 'react';
import FinancialOverviewPostAPI from '../../../../../api/financial/overview/FinancialOverviewPostAPI';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import fileDownload from 'js-file-download';
import moment from 'moment';
// import FinancialOverviewPostDelete from './FinancialOverviewPostDelete';

function FinancialOverviewPostItem({ financialOverviewPost }) {
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

    function clickItem(financialOverviewPostId) {
        downloadFinancialOverviewPost(financialOverviewPostId);
    }

    function downloadFinancialOverviewPost(financialOverviewPostId) {
        FinancialOverviewPostAPI.download(financialOverviewPostId).then(payload => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    }

    // function deleteProject() {
    //     FinancialOverviewPostAPI.deleteFinancialOverviewPost(financialOverviewPost.id)
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
                onDoubleClick={() => clickItem(financialOverviewPost.id)}
                onMouseEnter={() => onLineEnter()}
                onMouseLeave={() => onLineLeave()}
            >
                <td>{financialOverviewPost.id}</td>
                <td>{financialOverviewPost.name}</td>
                <td>{financialOverviewPost.createdAt ? moment(financialOverviewPost.createdAt).format('L') : ''}</td>
                <td>
                    {showActionButtons ? (
                        <>
                            <a role="button" onClick={() => downloadFinancialOverviewPost(financialOverviewPost.id)}>
                                <span className="glyphicon glyphicon-open-file mybtn-success" />{' '}
                            </a>
                            {/*&nbsp;&nbsp;&nbsp;*/}
                            {/*<a role="button" onClick={toggleDelete}>*/}
                            {/*    <span className="glyphicon glyphicon-trash mybtn-danger" />*/}
                            {/*</a>*/}
                        </>
                    ) : (
                        ''
                    )}
                </td>
            </tr>

            {/*{showDelete && (*/}
            {/*    <FinancialOverviewPostDelete*/}
            {/*        financialOverviewPost={financialOverviewPost}*/}
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

export default FinancialOverviewPostItem;
