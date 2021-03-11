import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskTypeDetailsFormGeneralEdit from './TaskTypeDetailsFormGeneralEdit';
import TaskTypeDetailsFormGeneralView from './TaskTypeDetailsFormGeneralView';

class TaskTypeDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        const explanationWfExpiredTask = (
            <span>
                Er zal automatisch eenmalig een email verstuurd worden naar de verantwoordelijke als deze taak is
                verlopen.
            </span>
        );
        const explanationWfCompletedTask = (
            <span>
                Er zal automatisch eenmalig een email verstuurd worden naar contact taak als deze taak is afgehandeld
                is, rekening houdend met het opgegeven aantal dagen.
            </span>
        );
        const explanationWfNewTask = (
            <span>
                Er zal automatisch een email verstuurd worden naar de verantwoordelijke als de nieuwe taak wordt
                opgeslagen.
            </span>
        );

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <TaskTypeDetailsFormGeneralEdit
                        taskType={this.props.taskType}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                        explanationWfExpiredTask={explanationWfExpiredTask}
                        explanationWfNewTask={explanationWfNewTask}
                        explanationWfCompletedTask={explanationWfCompletedTask}
                    />
                ) : (
                    <TaskTypeDetailsFormGeneralView
                        {...this.props.taskType}
                        switchToEdit={this.switchToEdit}
                        explanationWfExpiredTask={explanationWfExpiredTask}
                        explanationWfNewTask={explanationWfNewTask}
                        explanationWfCompletedTask={explanationWfCompletedTask}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(TaskTypeDetailsFormGeneral);
