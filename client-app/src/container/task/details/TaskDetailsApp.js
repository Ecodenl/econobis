import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../components/panel/Panel';

import { fetchTaskDetails } from '../../../actions/task/TaskDetailsActions';
import TaskDetailsToolbar from './TaskDetailsToolbar';
import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHarmonica from './TaskDetailsHarmonica';
import PanelBody from '../../../components/panel/PanelBody';

class TaskDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTaskDetails(this.props.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.fetchTaskDetails(nextProps.params.id);
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

export default connect(null, mapDispatchToProps)(TaskDetailsApp);
