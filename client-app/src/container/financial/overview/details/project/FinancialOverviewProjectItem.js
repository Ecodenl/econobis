import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialOverviewProjectMakeConcept from './FinancialOverviewProjectMakeConcept';
import FinancialOverviewProjectMakeDefinitive from './FinancialOverviewProjectMakeDefinitive';
import FinancialOverviewProjectAPI from '../../../../../api/financial/overview/FinancialOverviewProjectAPI';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import FinancialOverviewProjectDelete from './FinancialOverviewProjectDelete';

import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/fa/check';
import { trash } from 'react-icons-kit/fa/trash';
import { remove } from 'react-icons-kit/fa/remove';

function FinancialOverviewProjectItem({
    financialOverview,
    financialOverviewProject,
    setShowNewFalse,
    refreshFinancialOverviewProjects,
}) {
    const navigate = useNavigate();

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
            setHighlightLine('highlight-row');
        }
    }

    function onLineLeave() {
        setShowActionButtuns(false);
        setHighlightLine('');
    }

    function clickItem(financialOverviewProjectId) {
        navigate(`/waardestaat-project/${financialOverviewProjectId}`);
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
                // let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (error.response.status !== 500) {
                    errorMessage = error.response.data.message;
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
                // let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (error.response.status !== 500) {
                    errorMessage = error.response.data.message;
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

    const rowClass =
        financialOverviewProject.statusId === 'in-progress'
            ? 'in-progress-row'
            : financialOverviewProject.statusId === 'concept' &&
              financialOverviewProject.hasInterimFinancialOverviewContacts
            ? 'in-progress-row-light'
            : financialOverviewProject.statusId === 'definitive'
            ? 'success-row-light'
            : '';
    return (
        <React.Fragment>
            <tr
                className={`${highlightLine} ${rowClass}`}
                onDoubleClick={() => clickItem(financialOverviewProject.id)}
                onMouseEnter={() => onLineEnter()}
                onMouseLeave={() => onLineLeave()}
            >
                <td>{financialOverviewProject.projectCode}</td>
                <td>{financialOverviewProject.projectName}</td>
                <td>{financialOverviewProject.projectType}</td>
                <td>{financialOverviewProject.status}</td>
                <td>
                    {financialOverview.definitive ? (
                        <a role="button">
                            <Icon className="mybtn-primary" size={14} icon={check} />
                            &nbsp;
                        </a>
                    ) : showActionButtons ? (
                        financialOverviewProject.definitive ? (
                            <a role="button" onClick={toggleMakeConcept}>
                                <Icon className="mybtn-danger" size={14} icon={remove} />
                                &nbsp;
                            </a>
                        ) : (
                            <>
                                <a role="button" onClick={toggleMakeDefinitive}>
                                    <Icon className="mybtn-success" size={14} icon={check} />
                                </a>
                                {financialOverviewProject.statusId === 'concept' &&
                                !financialOverviewProject.hasInterimFinancialOverviewContacts ? (
                                    <>
                                        &nbsp;&nbsp;&nbsp;
                                        <a role="button" onClick={toggleDelete}>
                                            <Icon className="mybtn-danger" size={14} icon={trash} />
                                        </a>
                                    </>
                                ) : (
                                    ''
                                )}
                            </>
                        )
                    ) : (
                        ''
                    )}
                </td>
            </tr>

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
            {showErrorModal && (
                <ErrorModal closeModal={closeErrorModal} title={'Fout bij opslaan'} errorMessage={modalErrorMessage} />
            )}
        </React.Fragment>
    );
}

export default FinancialOverviewProjectItem;
