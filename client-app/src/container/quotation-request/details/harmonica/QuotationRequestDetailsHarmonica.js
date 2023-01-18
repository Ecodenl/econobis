import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import DocumentHarmonica from './DocumentHarmonica';
import EmailSentHarmonica from './EmailSentHarmonica';
import ContactEmailSentHarmonica from "./ContactEmailSentHarmonica";
import CoachEmailSentHarmonica from "./CoachEmailSentHarmonica";

class HousingFileDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
                emailsSent: false,
                contactEmailsSent: false,
            },
        };

        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.newContactEmail = this.newContactEmail.bind(this);
        this.newCoachEmail = this.newCoachEmail.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    }

    newEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/contacts/${this.props.quotationRequestDetails.organisationOrCoach.id},${this.props.quotationRequestDetails.contact.id}`
        );
    }

    newContactEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.contact.id}`
        );
    }

    newCoachEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.organisationOrCoach.id}`
        );
    }

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/offerteverzoek/${this.props.id}`);
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
    render() {
        return (
            <div className="col-md-12 margin-10-top">
                <CoachEmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('coachEmailsSent')}
                    showEmailsSentList={this.state.toggleShowList.coachEmailsSent}
                    newEmail={this.newCoachEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedCoachEmailsSent?.length}
                />
                <ContactEmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('contactEmailsSent')}
                    showEmailsSentList={this.state.toggleShowList.contactEmailsSent}
                    newEmail={this.newContactEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedContactEmailsSent?.length}
                />
                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('coachAndContactEmailsSent')}
                    showEmailsSentList={this.state.toggleShowList.coachAndContactEmailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedCoachAndContactEmailsSent?.length}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.quotationRequestDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsHarmonica);
