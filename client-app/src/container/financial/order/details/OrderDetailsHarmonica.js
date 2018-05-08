import React, {Component} from 'react';
import { connect } from 'react-redux';

import TaskHarmonica from "./harmonica/TaskHarmonica";
import EmailHarmonica from "./harmonica/EmailHarmonica";
import DocumentHarmonica from "./harmonica/DocumentHarmonica";
import {hashHistory} from "react-router";


class OrderDetailsHarmonica extends Component {
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
        hashHistory.push(`/taak/nieuw/${type}/order/${this.props.orderDetails.id}`);
    };

    newEmail = () => {
        hashHistory.push(`/email/nieuw`);
    };

    newDocument = (type) => {
        hashHistory.push(`/document/nieuw/${type}/order/${this.props.orderDetails.id}`);
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.orderDetails.taskCount}
                    newTask={this.newTask}
                />
                <EmailHarmonica
                    toggleShowList={() => this.toggleShowList('emails')}
                    showEmailsList={this.state.toggleShowList.emails}
                    newEmail={this.newEmail}
                    emailCount={this.props.orderDetails.emailCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.orderDetails.documentCount}
                />
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(OrderDetailsHarmonica);
