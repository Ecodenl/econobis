import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';
import EmailInboxHarmonica from './harmonica/EmailInboxHarmonica';
import EmailSentHarmonica from './harmonica/EmailSentHarmonica';

class ProjectDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                documentsNotOnPortal: false,
                documentsOnPortal: false,
                emailsInbox: false,
                emailsSent: false,
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
        hashHistory.push(`/taak/nieuw/project/${this.props.project.id}`);
    };

    newDocumentNotOnPortal = type => {
        hashHistory.push(`/document/nieuw/${type}/eco/project/${this.props.project.id}`);
    };
    newDocumentOnPortal = type => {
        hashHistory.push(`/document/nieuw/${type}/portal/project/${this.props.project.id}`);
    };

    newEmail = () => {
        hashHistory.push(`/email/nieuw`);
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.project.taskCount}
                    newTask={this.newTask}
                />

                <DocumentHarmonica
                    title={'DOCUMENTEN ALLEEN IN ECONOBIS'}
                    toggleShowList={() => this.toggleShowList('documentsNotOnPortal')}
                    showDocumentsList={this.state.toggleShowList.documentsNotOnPortal}
                    newDocument={this.newDocumentNotOnPortal}
                    documentCount={this.props.project.documentCountNotOnPortal}
                    relatedDocuments={this.props.project.relatedDocumentsNotOnPortal}
                />

                <DocumentHarmonica
                    title={'DOCUMENTEN PORTAL'}
                    toggleShowList={() => this.toggleShowList('documentsOnPortal')}
                    showDocumentsList={this.state.toggleShowList.documentsOnPortal}
                    newDocument={this.newDocumentOnPortal}
                    documentCount={this.props.project.documentCountOnPortal}
                    relatedDocuments={this.props.project.relatedDocumentsOnPortal}
                />

                <EmailInboxHarmonica
                    toggleShowList={() => this.toggleShowList('emailsInbox')}
                    showEmailsInboxList={this.state.toggleShowList.emailsInbox}
                    newEmail={this.newEmail}
                    emailInboxCount={this.props.project.emailInboxCount}
                />

                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.project.emailSentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectDetailsHarmonica);
