import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import NoteHarmonica from './harmonica/NoteHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';
import EmailSentHarmonica from './harmonica/EmailSentHarmonica';

class OpportunityDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                notes: false,
                documents: false,
                emails: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.newTask = this.newTask.bind(this);
        this.newNote = this.newNote.bind(this);
        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
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

    newTask() {
        if (this.props.opportunityDetails.intake) {
            hashHistory.push(
                `/taak/nieuw/kans/${this.props.id}/contact/${this.props.opportunityDetails.intake.contact.id}`
            );
        } else {
            hashHistory.push(`/taak/nieuw/kans/${this.props.id}`);
        }
    }

    newNote() {
        if (this.props.opportunityDetails.intake) {
            hashHistory.push(
                `/taak/nieuw/afgehandeld/kans/${this.props.id}/contact/${this.props.opportunityDetails.intake.contact.id}`
            );
        } else {
            hashHistory.push(`/taak/nieuw/afgehandeld/kans/${this.props.id}`);
        }
    }

    newDocument(type) {
        hashHistory.push(
            `/document/nieuw/${type}/kans/${this.props.id}/intake/${this.props.opportunityDetails.intake.id}/contact/${this.props.opportunityDetails.intake.contact.id}`
        );
    }

    newEmail() {
        hashHistory.push(`/email/nieuw`);
    }

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.opportunityDetails.taskCount}
                    newTask={this.newTask}
                />

                <NoteHarmonica
                    toggleShowList={() => this.toggleShowList('notes')}
                    showNotesList={this.state.toggleShowList.notes}
                    noteCount={this.props.opportunityDetails.noteCount}
                    newNote={this.newNote}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.opportunityDetails.documentCount}
                />

                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.opportunityDetails.emailSentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        opportunityDetails: state.opportunityDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(OpportunityDetailsHarmonica);
