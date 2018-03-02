import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from "./harmonica/TaskHarmonica";
import DocumentHarmonica from "./harmonica/DocumentHarmonica";
import EmailInboxHarmonica from "./harmonica/EmailInboxHarmonica";
import EmailSentHarmonica from "./harmonica/EmailSentHarmonica";

class ProductionProjectDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                documents: false,
                emailsInbox: false,
                emailsSent: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
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

    newTask = () => {
        hashHistory.push(`/taak/nieuw/productie-project/${this.props.productionProject.id}`);
    };

    newDocument = () => {
        hashHistory.push(`/document/nieuw/internal/productie-project/${this.props.productionProject.id}`);
    };

    newEmail = () => {
        hashHistory.push(`/email/nieuw`);
    };

    render(){
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.productionProject.taskCount}
                    newTask={this.newTask}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.productionProject.documentCount}
                />

                <EmailInboxHarmonica
                    toggleShowList={() => this.toggleShowList('emailsInbox')}
                    showEmailsInboxList={this.state.toggleShowList.emailsInbox}
                    newEmail={this.newEmail}
                    emailInboxCount={this.props.productionProject.emailInboxCount}
                />

                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.productionProject.emailSentCount}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        productionProject: state.productionProjectDetails,
    };
};

export default connect(mapStateToProps)(ProductionProjectDetailsHarmonica);
