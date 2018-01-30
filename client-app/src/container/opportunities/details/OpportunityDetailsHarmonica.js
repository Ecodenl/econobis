import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import RelatedOpportunityHarmonica from './harmonica/RelatedOpportunityHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';

class OpportunityDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                relatedOpportunities: false,
                documents: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
        this.newTask = this.newTask.bind(this);
        this.newRelatedOpportunity = this.newRelatedOpportunity.bind(this);
        this.newDocument = this.newDocument.bind(this);
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

    newTask() {
        hashHistory.push(`/taak/nieuw/kans/${this.props.id}`);
    };

    newRelatedOpportunity() {
        hashHistory.push(`/kans/nieuw/contact/${this.props.opportunityDetails.contact.id}`);
    };

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/kans/${this.props.id}`);
    };

    render(){
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.opportunityDetails.taskCount}
                    newTask={this.newTask}
                />

                <RelatedOpportunityHarmonica
                    toggleShowList={() => this.toggleShowList('relatedOpportunities')}
                    showOpportunitiesList={this.state.toggleShowList.relatedOpportunities}
                    amountRelatedOpportunities={this.props.opportunityDetails.amountRelatedOpportunities}
                    newRelatedOpportunity={this.newRelatedOpportunity}
                />

                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.opportunityDetails.documentCount}
                />

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        opportunityDetails: state.opportunityDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(OpportunityDetailsHarmonica);
