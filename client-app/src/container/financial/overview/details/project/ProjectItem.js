import React, { Component } from 'react';

import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ProjectView from './ProjectView';
import ProjectDelete from './ProjectDelete';
import { setError } from '../../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import ErrorModal from '../../../../../components/modal/ErrorModal';

class ProjectItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            typeIdError: false,
            numberError: false,
            financialOverviewProject: {
                ...props.financialOverviewProject,
            },
            errors: {
                typeId: false,
                number: false,
            },
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    clickItem = id => {
        hashHistory.push(`/waardestaat-project/${id}`);
    };

    makeConcept = () => {
        this.setState(
            {
                ...this.state,
                financialOverviewProject: {
                    ...this.state.financialOverviewProject,
                    definitive: false,
                },
            },
            this.updateProject
        );
    };

    makeDefinitive = () => {
        this.setState(
            {
                ...this.state,
                financialOverviewProject: {
                    ...this.state.financialOverviewProject,
                    definitive: true,
                },
            },
            this.updateProject
        );
    };

    updateProject() {
        FinancialOverviewDetailsAPI.updateFinancialOverviewProject(this.state.financialOverviewProject)
            .then(payload => {
                // financialoverview opnieuw fetchen
                this.props.callFetchFinancialOverviewDetails();
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                this.setState({
                    showErrorModal: true,
                    modalErrorMessage: errorMessage,
                });
            });
    }

    deleteProject = id => {
        FinancialOverviewDetailsAPI.deleteFinancialOverviewProject(id)
            .then(payload => {
                // financialoverview opnieuw fetchen
                this.props.callFetchFinancialOverviewDetails();
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                this.setState({
                    showErrorModal: true,
                    modalErrorMessage: errorMessage,
                });
            });
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <ProjectView
                        highlightLine={this.state.highlightLine}
                        showActionButtons={this.state.showActionButtons}
                        onLineEnter={this.onLineEnter}
                        onLineLeave={this.onLineLeave}
                        clickItem={this.clickItem}
                        makeConcept={this.makeConcept}
                        makeDefinitive={this.makeDefinitive}
                        toggleDelete={this.toggleDelete}
                        financialOverviewDefinitive={this.props.financialOverview.definitive}
                        financialOverviewProject={this.state.financialOverviewProject}
                    />
                    {this.state.showDelete && (
                        <ProjectDelete
                            financialOverviewProject={this.state.financialOverviewProject}
                            deleteProject={this.deleteProject}
                            closeDeleteItemModal={this.toggleDelete}
                        />
                    )}
                </div>
                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </React.Fragment>
        );
    }
}

// export default ProjectItem;

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(ProjectItem);
