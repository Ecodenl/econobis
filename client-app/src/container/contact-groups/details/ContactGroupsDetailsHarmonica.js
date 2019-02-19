import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';

class IntakeDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newTask = () => {
        hashHistory.push(`/taak/nieuw/contact-groep/${this.props.id}`);
    };

    newDocument = type => {
        hashHistory.push(`/document/nieuw/${type}/contact-groep/${this.props.id}`);
    };

    render() {
        const { permissions = {} } = this.props;
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.contactGroupDetails.taskCount}
                    newTask={this.newTask}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.contactGroupDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactGroupDetails: state.contactGroupDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(IntakeDetailsHarmonica);
