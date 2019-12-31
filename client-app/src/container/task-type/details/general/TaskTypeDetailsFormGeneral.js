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

        const explanationWfExpiredTask = <span>Hier uitleg 1{/*<br /> enzo*/}</span>;
        const explanationWfCompletedTask = <span>Hier uitleg 2{/*<br /> enzo*/}</span>;

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
                        explanationWfCompletedTask={explanationWfCompletedTask}
                    />
                ) : (
                    <TaskTypeDetailsFormGeneralView
                        {...this.props.taskType}
                        switchToEdit={this.switchToEdit}
                        explanationWfExpiredTask={explanationWfExpiredTask}
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
