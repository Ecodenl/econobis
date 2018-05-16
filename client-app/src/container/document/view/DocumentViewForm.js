import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PdfViewer from "../../../components/pdf/PdfViewer";
import DocumentDetailsAPI from "../../../api/document/DocumentDetailsAPI";

class DocumentViewForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            file: null,
        };
    }

    componentDidMount() {
       this.downloadFile();
    };

    downloadFile(i = 0) {
        DocumentDetailsAPI.download(this.props.documentId).then((payload) => {
            this.setState({
                file: payload.data,
            });
        }).catch(() => {
            if (i < 2) {
                setTimeout(() => {
                    this.downloadFile(i);
                }, 500);
            }
            i++;
        });
    };

    render() {
        return (
            isEmpty(this.props.documentDetails) || !this.state.file ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <PdfViewer
                        file={this.state.file}
                        scale={this.props.scale}
                    />
                </div>

        );
    }
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
    };
};

export default connect(mapStateToProps, null)(DocumentViewForm);
