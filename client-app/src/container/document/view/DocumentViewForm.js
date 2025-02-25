import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../components/pdf/PdfViewer';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';

class DocumentViewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentDidMount() {
        this.downloadFile();
    }

    downloadFile(i = 0) {
        DocumentDetailsAPI.download(this.props.documentId)
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(i);
                    }, 500);
                }
                i++;
            });
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van document.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.documentDetails)) {
            loadingText = 'Geen document gevonden!';
        } else if (!this.state.file) {
            if (this.props.documentDetails.onAlfresco) {
                loadingText = 'Document van Alfresco halen.';
            } else {
                loadingText = 'Document ophalen.';
            }
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <PdfViewer file={this.state.file} scale={this.props.scale} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(DocumentViewForm);
