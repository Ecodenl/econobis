import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import TaskDetailsFormGeneral from './general/TaskDetailsFormGeneral';
import TaskDetailsFormProperties from './properties/TaskDetailsFormProperties';

class TaskDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.taskDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <TaskDetailsFormGeneral />
                    <TaskDetailsFormProperties />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
    };
};

export default connect(mapStateToProps, null)(TaskDetailsForm);
