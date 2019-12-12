import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import TaskTypeDetailsAPI from '../../../../api/task-type/TaskTypeDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import ViewText from '../../../../components/form/ViewText';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import validator from 'validator';

class TaskTypeDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailTemplates: [],
            taskType: {
                ...props.taskType,
            },
            errors: {
                usesWfCompletedTask: false,
                emailTemplateIdWfCompletedTask: false,
                numberOfDaysToSendEmailCompletedTask: false,
                usesWfExpiredTask: false,
                emailTemplateIdWfExpiredTask: false,
            },
            peekLoading: {
                emailTemplates: true,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            taskType: {
                ...this.state.taskType,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            taskType: {
                ...this.state.taskType,
                [name]: selectedOption,
            },
        });
    }

    componentDidMount() {
        EmailTemplateAPI.fetchEmailTemplatesPeek().then(emailTemplates =>
            this.setState({
                emailTemplates,
                peekLoading: {
                    ...this.state.peekLoading,
                    emailTemplates: false,
                },
            })
        );
    }

    handleSubmit = event => {
        event.preventDefault();

        const { taskType } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (taskType.usesWfExpiredTask == true) {
            if (!taskType.emailTemplateIdWfExpiredTask) {
                errors.emailTemplateIdWfExpiredTask = true;
                hasErrors = true;
            }
        }
        if (taskType.usesWfCompletedTask == true) {
            if (!taskType.emailTemplateIdWfCompletedTask) {
                errors.emailTemplateIdWfCompletedTask = true;
                hasErrors = true;
            }
            if (validator.isEmpty(taskType.numberOfDaysToSendEmailCompletedTask.toString())) {
                errors.numberOfDaysToSendEmailCompletedTask = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            TaskTypeDetailsAPI.updateTaskType(taskType)
                .then(payload => {
                    this.props.updateState(payload.data.data);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            name,
            usesWfCompletedTask,
            emailTemplateIdWfCompletedTask,
            numberOfDaysToSendEmailCompletedTask,
            usesWfExpiredTask,
            emailTemplateIdWfExpiredTask,
        } = this.state.taskType;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <ViewText label={'Omschrijving'} value={name} className={'col-sm-6 form-group'} />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Gebruikt workflow verlopen taak'}
                                name={'usesWfExpiredTask'}
                                value={usesWfExpiredTask}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        {usesWfExpiredTask == true && (
                            <React.Fragment>
                                <div className="row">
                                    <InputReactSelect
                                        label={'Template email verlopen taak'}
                                        name={'emailTemplateIdWfExpiredTask'}
                                        options={this.state.emailTemplates}
                                        value={emailTemplateIdWfExpiredTask}
                                        onChangeAction={this.handleReactSelectChange}
                                        isLoading={this.state.peekLoading.emailTemplates}
                                        multi={false}
                                        required={'required'}
                                        error={this.state.errors.emailTemplateIdWfExpiredTask}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        <div className="row">
                            <InputToggle
                                label={'Gebruikt workflow afgehandelde taak'}
                                name={'usesWfCompletedTask'}
                                value={usesWfCompletedTask}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        {usesWfCompletedTask == true && (
                            <React.Fragment>
                                <div className="row">
                                    <InputReactSelect
                                        label={'Template email afgehandelde taak'}
                                        name={'emailTemplateIdWfCompletedTask'}
                                        options={this.state.emailTemplates}
                                        value={emailTemplateIdWfCompletedTask}
                                        onChangeAction={this.handleReactSelectChange}
                                        isLoading={this.state.peekLoading.emailTemplates}
                                        multi={false}
                                        required={'required'}
                                        error={this.state.errors.emailTemplateIdWfCompletedTask}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        label={'Aantal dagen email na afgehandelde taak'}
                                        type={'number'}
                                        min={'0'}
                                        id={'numberOfDaysToSendEmailCompletedTask'}
                                        name={'numberOfDaysToSendEmailCompletedTask'}
                                        value={numberOfDaysToSendEmailCompletedTask}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        error={this.state.errors.numberOfDaysToSendEmailCompletedTask}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(TaskTypeDetailsFormGeneralEdit);
