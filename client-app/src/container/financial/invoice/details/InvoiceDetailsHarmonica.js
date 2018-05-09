import React, {Component} from 'react';
import { connect } from 'react-redux';

import TaskHarmonica from "./harmonica/TaskHarmonica";
import EmailHarmonica from "./harmonica/EmailHarmonica";
import DocumentHarmonica from "./harmonica/DocumentHarmonica";
import {hashHistory} from "react-router";


class InvoiceDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                emails: false,
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    tasks: false,
                    emails: false,
                    documents: false,
                },
            })
        }
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

    newTask = (type) => {
        hashHistory.push(`/taak/nieuw/${type}/invoice/${this.props.invoiceDetails.id}`);
    };

    newEmail = () => {
        hashHistory.push(`/email/nieuw`);
    };

    newDocument = (type) => {
        hashHistory.push(`/document/nieuw/${type}/invoice/${this.props.invoiceDetails.id}`);
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.invoiceDetails.taskCount}
                    newTask={this.newTask}
                />
                <EmailHarmonica
                    toggleShowList={() => this.toggleShowList('emails')}
                    showEmailsList={this.state.toggleShowList.emails}
                    newEmail={this.newEmail}
                    emailCount={this.props.invoiceDetails.emailCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.invoiceDetails.documentCount}
                />
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(InvoiceDetailsHarmonica);
