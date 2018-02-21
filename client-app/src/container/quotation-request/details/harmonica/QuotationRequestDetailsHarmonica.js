import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import DocumentHarmonica from "./DocumentHarmonica";
import EmailSentHarmonica from "./EmailSentHarmonica";

class HousingFileDetailsHarmonica extends Component {
    constructor(props){
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
                emailsSent: false,
            },
        };

        this.newDocument = this.newDocument.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    };

    newEmail() {
        hashHistory.push(`/email/nieuw`);
    };

    newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/offerteverzoek/${this.props.id}`);
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
    render(){
        return (
            <div className="col-md-12 margin-10-top">
                <EmailSentHarmonica
                    toggleShowList={() => this.toggleShowList('emailsSent')}
                    showEmailsSentList={this.state.toggleShowList.emailsSent}
                    newEmail={this.newEmail}
                    emailSentCount={this.props.quotationRequestDetails.emailSentCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.quotationRequestDetails.documentCount}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(HousingFileDetailsHarmonica);
