import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from "./TaskHarmonica";
import NoteHarmonica from "./NoteHarmonica";
import DocumentHarmonica from "./DocumentHarmonica";
import EmailHarmonica from "./EmailHarmonica";

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
        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    };

    newTask() {
        hashHistory.push(`/taak/nieuw/intake/${this.props.id}`);
    };

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/intake/${this.props.id}`);
    };

    newEmail() {
        hashHistory.push(`/email/nieuw/intake/${this.props.id}`);
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
                    newTask={this.newTask}
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
                    emailCount={this.props.intakeDetails.emailCount}
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
