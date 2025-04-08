import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import NoteHarmonica from './harmonica/NoteHarmonica';
import EmailInboxHarmonica from './harmonica/EmailInboxHarmonica';
import EmailSentHarmonica from './harmonica/EmailSentHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';
import { hashHistory } from 'react-router';

class TaskDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
                tasks: false,
                notes: false,
                emailsInbox: false,
                emailsSent: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    tasks: false,
                    notes: false,
                    emailsInbox: false,
                    emailsSent: false,
                    documents: false,
                },
            });
        }
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

    newDocument = type => {
        hashHistory.push(`/document/nieuw/${type}/taak/${this.props.taskDetails.id}`);
    };

    newEmail = () => {
        if (this.props.taskDetails.contact) {
            hashHistory.push(
                `/email/nieuw/taak/${this.props.taskDetails.id}/contact/${this.props.taskDetails.contact.id}`
            );
        } else {
            hashHistory.push(`/email/nieuw/taak/${this.props.taskDetails.id}`);
        }
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.taskDetails.taskCount}
                />

                <NoteHarmonica
                    toggleShowList={() => this.toggleShowList('notes')}
                    showNotesList={this.state.toggleShowList.notes}
                    noteCount={this.props.taskDetails.noteCount}
                />

                <EmailInboxHarmonica
                    toggleShowList={() => this.toggleShowList('emailsInbox')}
                    showEmailsInboxList={this.state.toggleShowList.emailsInbox}
                    newEmail={this.newEmail}
                    emailInboxCount={this.props.taskDetails.emailInboxCount}
                />

                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.taskDetails.emailSentCount}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.taskDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskDetails: state.taskDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(TaskDetailsHarmonica);
