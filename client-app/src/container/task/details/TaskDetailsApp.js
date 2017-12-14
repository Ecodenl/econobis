import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchTaskDetails} from '../../../actions/task/TaskDetailsActions';
import TaskDetailsToolbar from './TaskDetailsToolbar';
import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHarmonica from './TaskDetailsHarmonica';

class TaskDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTaskDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <TaskDetailsToolbar/>
                    </div>

                    <div className="col-md-12">
                        <TaskDetailsForm/>
                    </div>
                </div>
                <div className="col-md-3">
                    <TaskDetailsHarmonica />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTaskDetails: (id) => {
        dispatch(fetchTaskDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(TaskDetailsApp);
