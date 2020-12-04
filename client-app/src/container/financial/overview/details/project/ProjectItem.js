import React, { Component } from 'react';
import { isEqual } from 'lodash';

import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import ProjectView from './ProjectView';
// import ProjectEdit from './ProjectEdit';
import ProjectDelete from './ProjectDelete';

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('ProjectItem');
        console.log(props);

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
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.financialOverviewProject, nextProps.financialOverviewProject)) {
            this.setState({
                ...this.state,
                financialOverviewProject: {
                    ...nextProps.financialOverviewProject,
                },
            });
        }
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
        FinancialOverviewDetailsAPI.updateFinancialOverviewProject(this.state.financialOverviewProject);
    }

    deleteProject = id => {
        FinancialOverviewDetailsAPI.deleteFinancialOverviewProject(id)
            .then(payload => {
                //project ook deleten uit state
                console.log('ProjectItem - deleteProject');
                console.log(id);
                this.props.deleteProjectToState(id);
            })
            .catch(error => {
                // todo WM: opschonen log regels
                console.log('delete error');
                console.log(error);
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <ProjectView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    // openEdit={this.openEdit}
                    makeConcept={this.makeConcept}
                    makeDefinitive={this.makeDefinitive}
                    toggleDelete={this.toggleDelete}
                    financialOverviewDefinitive={this.props.financialOverview.definitive}
                    financialOverviewProject={this.state.financialOverviewProject}
                />
                {/*{this.state.showEdit && (*/}
                {/*    <ProjectEdit*/}
                {/*        financialOverview={this.props.financialOverview}*/}
                {/*        handleInputChange={this.handleInputChange}*/}
                {/*        handleSubmit={this.handleSubmit}*/}
                {/*        typeIdError={this.state.errors.typeId}*/}
                {/*        numberError={this.state.errors.number}*/}
                {/*        cancelEdit={this.cancelEdit}*/}
                {/*    />*/}
                {/*)}*/}
                {this.state.showDelete && (
                    <ProjectDelete
                        financialOverviewProject={this.state.financialOverviewProject}
                        deleteProject={this.deleteProject}
                        closeDeleteItemModal={this.toggleDelete}
                    />
                )}
            </div>
        );
    }
}

export default ProjectItem;
