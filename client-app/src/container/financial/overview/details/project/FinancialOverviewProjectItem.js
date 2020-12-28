import React, { useState } from 'react';
import { hashHistory } from 'react-router';
import FinancialOverviewProjectMakeConcept from './FinancialOverviewProjectMakeConcept';
import FinancialOverviewProjectMakeDefinitive from './FinancialOverviewProjectMakeDefinitive';
import FinancialOverviewProjectAPI from '../../../../../api/financial/overview/FinancialOverviewProjectAPI';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import FinancialOverviewProjectDelete from './FinancialOverviewProjectDelete';

function FinancialOverviewProjectItem({
    financialOverview,
    financialOverviewProject,
    setShowNewFalse,
    refreshFinancialOverviewProjects,
}) {
    const [showActionButtons, setShowActionButtuns] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');
    const [showMakeConcept, setShowMakeConcept] = useState(false);
    const [showMakeDefinitive, setShowMakeDefinitive] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState(false);

    function onLineEnter() {
        if (financialOverviewProject.statusId !== 'in-progress') {
            setShowActionButtuns(true);
            setHighlightLine('highlight-line');
        }
    }

    function onLineLeave() {
        setShowActionButtuns(false);
        setHighlightLine('');
    }

    function clickItem(financialOverviewProjectId) {
        hashHistory.push(`/waardestaat-project/${financialOverviewProjectId}`);
    }

    function makeConceptProject() {
        updateProject(financialOverviewProject.id, false);
        toggleMakeConcept();
    }

    function makeDefinitiveProject() {
        updateProject(financialOverviewProject.id, true);
        toggleMakeDefinitive();
    }

    function updateProject(financialOverviewProjectId, definitive) {
        const data = new FormData();

        data.append('definitive', definitive);

        FinancialOverviewProjectAPI.updateFinancialOverviewProject(financialOverviewProjectId, data)
            .then(payload => {
                // financialoverview opnieuw fetchen
                refreshFinancialOverviewProjects();
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                setShowErrorModal(true);
                setModalErrorMessage(errorMessage);
            });
    }

    function deleteProject() {
        FinancialOverviewProjectAPI.deleteFinancialOverviewProject(financialOverviewProject.id)
            .then(payload => {
                setShowNewFalse(false);
                toggleDelete();
                // financialoverview opnieuw fetchen
                refreshFinancialOverviewProjects();
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                setShowErrorModal(true);
                setModalErrorMessage(errorMessage);
            });
    }

    function toggleMakeConcept() {
        setShowMakeConcept(!showMakeConcept);
    }

    function toggleMakeDefinitive(action) {
        setShowMakeDefinitive(!showMakeDefinitive);
    }

    function toggleDelete() {
        setShowDelete(!showDelete);
    }

    function closeErrorModal() {
        setShowErrorModal(false);
        setModalErrorMessage('');
    }

    return (
        <React.Fragment>
            <div>
                <div
                    className={`row border ${highlightLine}`}
                    onDoubleClick={() => clickItem(financialOverviewProject.id)}
                    onMouseEnter={() => onLineEnter()}
                    onMouseLeave={() => onLineLeave()}
                >
                    {/*<div onClick={openEdit}>*/}
                    <div>
                        <div className="col-sm-2">{financialOverviewProject.projectCode}</div>
                        <div className="col-sm-5">{financialOverviewProject.projectName}</div>
                        <div className="col-sm-2">{financialOverviewProject.projectType}</div>
                        <div className="col-sm-2">{financialOverviewProject.status}</div>
                    </div>
                    <div className="col-sm-1">
                        {financialOverview.definitive ? (
                            <a role="button">
                                <span className="glyphicon glyphicon-ok mybtn-primary" />{' '}
                            </a>
                        ) : showActionButtons ? (
                            financialOverviewProject.definitive ? (
                                <a role="button" onClick={toggleMakeConcept}>
                                    <span className="glyphicon glyphicon-remove mybtn-danger" />
                                </a>
                            ) : (
                                <>
                                    <a role="button" onClick={toggleMakeDefinitive}>
                                        <span className="glyphicon glyphicon-ok mybtn-success" />
                                    </a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a role="button" onClick={toggleDelete}>
                                        <span className="glyphicon glyphicon-trash mybtn-danger" />
                                    </a>
                                </>
                            )
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                {showMakeConcept && (
                    <FinancialOverviewProjectMakeConcept
                        financialOverviewProject={financialOverviewProject}
                        makeConceptProject={makeConceptProject}
                        closeMakeConceptItemModal={toggleMakeConcept}
                    />
                )}
                {showMakeDefinitive && (
                    <FinancialOverviewProjectMakeDefinitive
                        totalFinancialOverviewProjectsInProgress={
                            financialOverview.totalFinancialOverviewProjectsInProgress
                        }
                        totalFinancialOverviewProjectsConcept={financialOverview.totalFinancialOverviewProjectsConcept}
                        totalFinancialOverviewProjectsDefinitive={
                            financialOverview.totalFinancialOverviewProjectsDefinitive
                        }
                        financialOverviewProject={financialOverviewProject}
                        makeDefinitiveProject={makeDefinitiveProject}
                        closeMakeDefinitiveItemModal={toggleMakeDefinitive}
                    />
                )}
                {showDelete && (
                    <FinancialOverviewProjectDelete
                        financialOverviewProject={financialOverviewProject}
                        deleteProject={deleteProject}
                        closeDeleteItemModal={toggleDelete}
                    />
                )}
            </div>
            {showErrorModal && (
                <ErrorModal closeModal={closeErrorModal} title={'Fout bij opslaan'} errorMessage={modalErrorMessage} />
            )}
        </React.Fragment>
    );
}

export default FinancialOverviewProjectItem;
