import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentHarmonica from './DocumentHarmonica';
import NoteHarmonica from './NoteHarmonica';

// Functionele wrapper voor de class component
const HousingFileDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <HousingFileDetailsHarmonica {...props} navigate={navigate} />;
};

class HousingFileDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                documents: false,
                notes: false,
            },
        };

        this.newTask = this.newTask.bind(this);
        this.newNote = this.newNote.bind(this);
        this.newDocument = this.newDocument.bind(this);
        this.toggleShowList = this.toggleShowList.bind(this);
    }

    newTask() {
        if (this.props.housingFileDetails) {
            this.props.navigate(
                `/taak/nieuw/woningdossier/${this.props.id}/contact/${this.props.housingFileDetails.address.contactId}`
            );
        }
    }

    newNote() {
        if (this.props.housingFileDetails) {
            this.props.navigate(
                `/taak/nieuw/afgehandeld/woningdossier/${this.props.id}/contact/${this.props.housingFileDetails.address.contactId}`
            );
        }
    }

    newDocument(type) {
        if (this.props.housingFileDetails) {
            this.props.navigate(
                `/document/nieuw/${type}/woningdossier/${this.props.id}/contact/${this.props.housingFileDetails.address.contactId}`
            );
        }
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
                <NoteHarmonica
                    toggleShowList={() => this.toggleShowList('notes')}
                    showNotesList={this.state.toggleShowList.notes}
                    newNote={this.newNote}
                    noteCount={this.props.housingFileDetails.noteCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.housingFileDetails.documentCount}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(HousingFileDetailsHarmonicaWrapper);
