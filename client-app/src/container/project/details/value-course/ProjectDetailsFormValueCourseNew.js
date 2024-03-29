import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectValueCourseAPI from '../../../../api/project/ProjectValueCourseAPI';
import { newValueCourse } from '../../../../actions/project/ProjectDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import InputToggle from '../../../../components/form/InputToggle';
import moment from 'moment/moment';

class ProjectDetailsFormValueCourseNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: this.props.name,
            valueCourse: {
                projectId: this.props.id,
                date: '',
                bookWorth: 0,
                transferWorth: 0,
                active: false,
            },
            errors: {
                bookWorth: false,
                date: false,
            },
            isSaving: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

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
            ProjectValueCourseAPI.storeProjectValueCourse(valueCourse).then(payload => {
                this.props.newValueCourse(payload);
                this.setState({ isSaving: false });
                this.props.toggleShowNew();
            });
        }
    };

    render() {
        const { date, bookWorth, transferWorth, active } = this.state.valueCourse;

        let disableBeforeDate = this.props.lastYearFinancialOverviewDefinitive
            ? moment(moment().year(this.props.lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
            : '';

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Project'}
                                name={'projectName'}
                                value={this.state.projectName}
                                readOnly={true}
                            />
                            <InputDate
                                label={'Datum'}
                                name={'date'}
                                value={date}
                                onChangeAction={this.handleInputChangeDate}
                                disabledBefore={disableBeforeDate}
                                required={'required'}
                                error={this.state.errors.date}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={this.props.projectType.codeRef === 'obligation' ? 'Hoofdsom' : ' Boekwaarde'}
                                name={'bookWorth'}
                                value={bookWorth}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.bookWorth}
                            />
                            <InputText
                                type={'number'}
                                label={'Overdrachtswaarde'}
                                name={'transferWorth'}
                                value={transferWorth}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.transferWorth}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Actief'}
                                name={'active'}
                                value={active}
                                onChangeAction={this.handleInputChange}
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
                                loading={this.state.isSaving}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.projectDetails.id,
        name: state.projectDetails.name,
        projectType: state.projectDetails.projectType,
    };
};

const mapDispatchToProps = dispatch => ({
    newValueCourse: id => {
        dispatch(newValueCourse(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsFormValueCourseNew);
