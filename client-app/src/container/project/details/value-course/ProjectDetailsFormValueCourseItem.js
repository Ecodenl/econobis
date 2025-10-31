import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import ProjectValueCourseAPI from '../../../../api/project/ProjectValueCourseAPI';
import { updateValueCourse } from '../../../../actions/project/ProjectDetailsActions';
import ProjectDetailsFormValueCourseView from './ProjectDetailsFormValueCourseView';
import ProjectDetailsFormValueCourseEdit from './ProjectDetailsFormValueCourseEdit';
import ProjectDetailsFormValueCourseDelete from './ProjectDetailsFormValueCourseDelete';

class ProjectDetailsFormValueCourseItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            valueCourse: props.valueCourse,
            errors: {
                bookWorth: false,
                date: false,
            },
            isSaving: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.valueCourse, this.props.valueCourse)) {
            this.setState({
                ...this.state,
                valueCourse: this.props.valueCourse,
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

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            valueCourse: this.props.valueCourse,
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value,
            },
        });
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            valueCourse: {
                ...this.state.valueCourse,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { valueCourse } = this.state;
        // Validation
        let errors = {};
        let hasErrors = false;

        if (valueCourse.bookWorth) {
            if (isNaN(valueCourse.bookWorth)) {
                valueCourse.bookWorth = valueCourse.bookWorth.replace(/,/g, '.');
            }
        } else {
            errors.bookWorth = true;
            hasErrors = true;
        }

        if (isNaN(valueCourse.transferWorth)) {
            valueCourse.transferWorth = valueCourse.transferWorth.replace(/,/g, '.');
        }

        if (!valueCourse.date) {
            errors.date = true;
            hasErrors = true;
        }

        this.setState({ errors });

        // If no errors send form
        if (!hasErrors) {
            this.setState({ isSaving: true });
            ProjectValueCourseAPI.updateProjectValueCourse(valueCourse.id, valueCourse).then(payload => {
                this.props.updateValueCourse(payload);
                this.setState({ isSaving: false });
                this.closeEdit();
            });
        }
    };

    render() {
        return (
            <div>
                <ProjectDetailsFormValueCourseView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    valueCourse={this.state.valueCourse}
                />
                {this.state.showEdit && this.props.permissions.manageProject && (
                    <ProjectDetailsFormValueCourseEdit
                        valueCourse={this.state.valueCourse}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        errors={this.state.errors}
                        cancelEdit={this.cancelEdit}
                        isSaving={this.state.isSaving}
                        lastYearFinancialOverviewDefinitive={this.props.lastYearFinancialOverviewDefinitive}
                    />
                )}
                {this.state.showDelete && this.props.permissions.manageProject && (
                    <ProjectDetailsFormValueCourseDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.valueCourse}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectType: state.projectDetails.projectType,
        lastYearFinancialOverviewDefinitive: state.projectDetails.lastYearFinancialOverviewDefinitive,
    };
};

const mapDispatchToProps = dispatch => ({
    updateValueCourse: id => {
        dispatch(updateValueCourse(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsFormValueCourseItem);
