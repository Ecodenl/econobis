import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import NoteHarmonica from './harmonica/NoteHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';

class CampaignDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                notes: false,
                emailsInbox: false,
                emailsSent: false,
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
        hashHistory.push(`/taak/nieuw/campagne/${this.props.campaign.id}`);
    };

    newNote = () => {
        hashHistory.push(`/taak/nieuw/afgehandeld/campagne/${this.props.campaign.id}`);
    };

    newDocument = type => {
        hashHistory.push(`/document/nieuw/${type}/campagne/${this.props.campaign.id}`);
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.campaign.taskCount}
                    newTask={this.newTask}
                />

                <NoteHarmonica
                    toggleShowList={() => this.toggleShowList('notes')}
                    showNotesList={this.state.toggleShowList.notes}
                    noteCount={this.props.campaign.noteCount}
                    newNote={this.newNote}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.campaign.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaign: state.campaignDetails,
    };
};

export default connect(mapStateToProps)(CampaignDetailsHarmonica);
