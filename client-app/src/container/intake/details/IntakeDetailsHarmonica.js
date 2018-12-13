import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from "./harmonica/TaskHarmonica";
import NoteHarmonica from "./harmonica/NoteHarmonica";
import DocumentHarmonica from "./harmonica/DocumentHarmonica";
import EmailHarmonica from "./harmonica/EmailHarmonica";

class IntakeDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowOpportunities: false,
            toggleShowList: {
                documents: false,
                tasks: false,
                notes: false,
                emails: false,
            },
        };

        this.newTask = this.newTask.bind(this);
        this.newNote = this.newNote.bind(this);
        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    };

    newTask() {
        hashHistory.push(`/taak/nieuw/intake/${this.props.id}`);
    };

    newNote() {
        hashHistory.push(`/taak/nieuw/afgehandeld/intake/${this.props.id}`);
    };

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/intake/${this.props.id}/contact/${this.props.intakeDetails.contact.id}`);
    };

    newEmail() {
        hashHistory.push(`/email/nieuw/intake/${this.props.id}/contact/${this.props.intakeDetails.contact.id}`);
    };

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            }
        });
    };

    render() {
        return (
            <div className="col-md-12 margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    newTask={this.newTask}
                    taskCount={this.props.intakeDetails.taskCount}
                />
                <NoteHarmonica
                    toggleShowList={() => this.toggleShowList('notes')}
                    showNotesList={this.state.toggleShowList.notes}
                    newNote={this.newNote}
                    noteCount={this.props.intakeDetails.noteCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.intakeDetails.documentCount}
                />
                <EmailHarmonica
                    toggleShowList={() => this.toggleShowList('emails')}
                    showEmailsList={this.state.toggleShowList.emails}
                    newEmail={this.newEmail}
                    emailCount={this.props.intakeDetails.emailSentCount}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        intakeDetails: state.intakeDetails,
    };
};

export default connect(mapStateToProps)(IntakeDetailsHarmonica);
