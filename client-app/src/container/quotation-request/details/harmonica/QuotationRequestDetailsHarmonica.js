import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import DocumentHarmonica from './DocumentHarmonica';
import EmailSentHarmonica from './EmailSentHarmonica';
import OccupantEmailSentHarmonica from './OccupantEmailSentHarmonica';
import CoachEmailSentHarmonica from './CoachEmailSentHarmonica';

class QuotationRequestDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
                emailsSent: false,
                occupantEmailsSent: false,
            },
        };

        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.newOccupantEmail = this.newOccupantEmail.bind(this);
        this.newCoachEmail = this.newCoachEmail.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    }

    newEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.organisationOrCoachId}/occupant/${this.props.quotationRequestDetails.occupantId}`
        );
    }

    newOccupantEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.occupantId}`
        );
    }

    newCoachEmail() {
        hashHistory.push(
            `/email/nieuw/offerteverzoek/${this.props.id}/${this.props.quotationRequestDetails.organisationOrCoachId}`
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
        const organisationOrCoachId = this.props.quotationRequestDetails.organisationOrCoachId;
        const occupantId = this.props.quotationRequestDetails.occupantId;
        // const projectManagerId = this.props.quotationRequestDetails.projectManagerId;
        // const externalPartyId = this.props.quotationRequestDetails.externalPartyId;

        return (
            <div className="col-md-12 margin-10-top">
                {organisationOrCoachId && (
                    <CoachEmailSentHarmonica
                        toggleShowList={() => this.toggleShowList('coachEmailsSent')}
                        showEmailsSentList={this.state.toggleShowList.coachEmailsSent}
                        newEmail={this.newCoachEmail}
                        emailSentCount={this.props.quotationRequestDetails.relatedCoachEmailsSent?.length}
                    />
                )}
                {occupantId && (
                    <OccupantEmailSentHarmonica
                        toggleShowList={() => this.toggleShowList('occupantEmailsSent')}
                        showEmailsSentList={this.state.toggleShowList.occupantEmailsSent}
                        newEmail={this.newOccupantEmail}
                        emailSentCount={this.props.quotationRequestDetails.relatedOccupantEmailsSent?.length}
                    />
                )}
                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('coachAndOccupantEmailsSent')}
                    showEmailsSentList={this.state.toggleShowList.coachAndOccupantEmailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.quotationRequestDetails.relatedCoachAndOccupantEmailsSent?.length}
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

export default connect(mapStateToProps)(QuotationRequestDetailsHarmonica);
