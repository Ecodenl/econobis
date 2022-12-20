import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import DocumentHarmonica from './DocumentHarmonica';
import EmailSentHarmonica from './EmailSentHarmonica';
import ContactEmailSentHarmonica from "./ContactEmailSentHarmonica";

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
        this.toggleShowList = this.toggleShowList.bind(this);
    }

    newEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.organisationOrCoach.id}`
        );
    }

    newContactEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.contact.id}`
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
                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedCoachEmailsSentCount}
                />
                <ContactEmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('contactEmailsSent')}
                    showEmailsSentList={this.state.toggleShowList.contactEmailsSent}
                    newEmail={this.newContactEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedContactEmailsSentCount}
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
