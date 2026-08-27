import React, { Component } from 'react';
import validator from 'validator';

import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';
import ErrorModal from '../../../../../components/modal/ErrorModal';
import FinancialOverviewProjectAPI from '../../../../../api/financial/overview/FinancialOverviewProjectAPI';

class FinancialOverviewProjectNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // projects: [testProjects],
            financialOverviewProjects: props.financialOverview.financialOverviewProjects,
            financialOverviewProject: {
                financialOverviewId: props.financialOverview.id,
                projectId: '',
                definitive: false,
            },
            errorMessage: false,
            errors: {
                projectId: false,
            },
            projectsForFinancialOverview: [],
            isLoading: false,
            hasError: false,
            showErrorModal: false,
            modalErrorMessage: '',
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        this.callFetchNewProjectsForFinancialOverview();
    }

    callFetchNewProjectsForFinancialOverview = () => {
        this.setState({ isLoading: true, hasError: false });
        FinancialOverviewDetailsAPI.fetchNewProjectsForFinancialOverview(this.props.financialOverview)
            .then(payload => {
                this.setState({ isLoading: false, projectsForFinancialOverview: payload.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            financialOverviewProject: {
                ...this.state.financialOverviewProject,
                [name]: selectedOption,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { financialOverviewProject } = this.state;
        // Validation
        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(financialOverviewProject.projectId + '')) {
            errors.projectId = true;
            errorMessage.projectId = 'Project is verplicht';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            FinancialOverviewProjectAPI.newFinancialOverviewProject(financialOverviewProject)
                .then(payload => {
                    this.props.toggleShowNew();
                    // financialoverview opnieuw fetchen
                    this.props.refreshFinancialOverviewProjects();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));
                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }
                    this.setState({
                        showErrorModal: true,
                        modalErrorMessage: errorMessage,
                    });
                });
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        const { projectId } = this.state.financialOverviewProject;

        return (
            <React.Fragment>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                {this.props.financialOverview && this.props.financialOverview.definitive ? (
                                    <div className={'col-sm-12 margin-10-bottom'}>
                                        <p className={'text-danger'}>
                                            Aan definitieve waardestaat kunnen geen projecten meer toegevoegd worden.
                                            <br />
                                        </p>
                                    </div>
                                ) : (
                                    <InputReactSelectLong
                                        label={'Project'}
                                        name={'projectId'}
                                        options={this.state.projectsForFinancialOverview}
                                        value={projectId}
                                        onChangeAction={this.handleReactSelectChange}
                                        required={'required'}
                                        error={this.state.errors.projectId}
                                        errorMessage={this.state.errorMessage.projectId}
                                    />
                                )}
                            </div>

                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Annuleren'}
                                    onClickAction={this.props.toggleShowNew}
                                />
                                {this.props.financialOverview && !this.props.financialOverview.definitive ? (
                                    <ButtonText
                                        buttonText={'Opslaan'}
                                        onClickAction={this.handleSubmit}
                                        type={'submit'}
                                        value={'Submit'}
                                    />
                                ) : null}
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
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

export default FinancialOverviewProjectNew;
