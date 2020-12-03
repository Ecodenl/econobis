import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';
import { hashHistory } from 'react-router';

class ProjectNew extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('ProjectNew');
        console.log(props);
        let testProjects = { id: 31, name: 'test project' };
        this.state = {
            projects: [testProjects],
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
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

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
            FinancialOverviewDetailsAPI.newFinancialOverviewProject(financialOverviewProject)
                .then(payload => {
                    // todo WM: opschonen log regels
                    // console.log('payload.data.data');
                    // console.log(payload.data.data);
                    this.props.toggleShowNew();
                    // this.setState({
                    //     ...this.state,
                    //     financialOverviewProjects: {
                    //         ...this.state.financialOverviewProjects,
                    //         financialOverviewProject: payload.data.data,
                    //     },
                    // });
                })
                .catch(error => {
                    this.props.setError(error.response.status, error.response.data.message);
                });
    };

    render() {
        const { projectId } = this.state.financialOverviewProject;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputReactSelectLong
                                label={'Project'}
                                name={'projectId'}
                                options={this.state.projects}
                                value={projectId}
                                onChangeAction={this.handleReactSelectChange}
                                required={'required'}
                                multi={false}
                                error={this.state.errors.projectId}
                                errorMessage={this.state.errorMessage.projectId}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         id: state.financialOverview.id,
//     };
// };
//
// const mapDispatchToProps = dispatch => ({
//     newProject: id => {
//         dispatch(newProject(id));
//     },
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(ProjectNew);
export default ProjectNew;
