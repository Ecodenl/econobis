import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import TaskDetailsFormGeneral from './general/TaskDetailsFormGeneral';

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
