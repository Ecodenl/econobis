import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import DocumentHarmonica from './harmonica/DocumentHarmonica';

class ParticipantDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
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

    newDocument = type => {
        hashHistory.push(
            `/document/nieuw/${type}/project/${this.props.participant.projectId}/participant/${
                this.props.participant.id
            }/contact/${this.props.participant.contact.id}`
        );
    };

    render() {
        return (
            <div className="margin-10-top">
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.participant.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participant: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsHarmonica);
