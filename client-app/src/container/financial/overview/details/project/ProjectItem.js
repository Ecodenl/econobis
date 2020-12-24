import React, { useEffect, useState } from 'react';

import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ProjectView from './ProjectView';
import ProjectMakeConcept from './ProjectMakeConcept';
import ProjectMakeDefinitive from './ProjectMakeDefinitive';
import ProjectDelete from './ProjectDelete';
import { setError } from '../../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import ErrorModal from '../../../../../components/modal/ErrorModal';

function ProjectItem({ financialOverviewProject, financialOverview, callFetchFinancialOverviewDetails }) {
    const [showActionButtons, setShowActionButtuns] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');
    const [showMakeConcept, setShowMakeConcept] = useState(false);
    const [showMakeDefinitive, setShowMakeDefinitive] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState(false);

    // If financial overview has changes, reload data here
    // useEffect(
    //     function() {
    //         callFetchFinancialOverviewDetails;
    //     },
    //     [financialOverviewProject.definitive]
    // );

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

    function clickItem(id) {
        hashHistory.push(`/waardestaat-project/${id}`);
    }

    function makeConceptProject() {
        // setFinancialOverviewProject({ ...financialOverviewProject, definitive: false });
        financialOverviewProject = { ...financialOverviewProject, definitive: false };
        updateProject();
    }

    function makeDefinitiveProject() {
        financialOverviewProject = { ...financialOverviewProject, definitive: true };
        updateProject();
    }

    function updateProject() {
        FinancialOverviewDetailsAPI.updateFinancialOverviewProject(financialOverviewProject)
            .then(payload => {
                // financialoverview opnieuw fetchen
                callFetchFinancialOverviewDetails();
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

    function deleteProject(id) {
        FinancialOverviewDetailsAPI.deleteFinancialOverviewProject(id)
            .then(payload => {
                setShowNewFalse();
                // financialoverview opnieuw fetchen
                callFetchFinancialOverviewDetails();
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
                <ProjectView
                    highlightLine={highlightLine}
                    showActionButtons={showActionButtons}
                    onLineEnter={onLineEnter}
                    onLineLeave={onLineLeave}
                    clickItem={clickItem}
                    toggleMakeConcept={toggleMakeConcept}
                    toggleMakeDefinitive={toggleMakeDefinitive}
                    toggleDelete={toggleDelete}
                    financialOverviewDefinitive={financialOverview.definitive}
                    financialOverviewProject={financialOverviewProject}
                />
                {showMakeConcept && (
                    <ProjectMakeConcept
                        financialOverviewProject={financialOverviewProject}
                        makeConceptProject={makeConceptProject}
                        closeMakeConceptItemModal={toggleMakeConcept}
                    />
                )}
                {showMakeDefinitive && (
                    <ProjectMakeDefinitive
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
                    <ProjectDelete
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

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(ProjectItem);
