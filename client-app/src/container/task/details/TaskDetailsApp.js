import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../components/panel/Panel';

import { fetchTaskDetails } from '../../../actions/task/TaskDetailsActions';
import TaskDetailsToolbar from './TaskDetailsToolbar';
import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHarmonica from './TaskDetailsHarmonica';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

const TaskDetailsAppWrapper = props => {
    const params = useParams();
    return <TaskDetailsApp {...props} params={params} />;
};

class TaskDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTaskDetails(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            this.props.fetchTaskDetails(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <TaskDetailsToolbar />
                    </div>

                    <div className="col-md-12">
                        <TaskDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <TaskDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTaskDetails: id => {
        dispatch(fetchTaskDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(TaskDetailsAppWrapper);
