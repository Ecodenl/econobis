import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import TaskDetailsFormGeneral from './general/TaskDetailsFormGeneral';
import TaskDetailsFormProperties from './properties/TaskDetailsFormProperties';
import TaskDetailsFormConclusion from './conclusion/TaskDetailsFormConclusion';

class TaskDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van gegevens.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.taskDetails)) {
            loadingText = 'Geen gegevens gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <TaskDetailsFormGeneral />
                <TaskDetailsFormProperties />
                <TaskDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskDetails: state.taskDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(
    mapStateToProps,
    null
)(TaskDetailsForm);
