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
        DocumentDetailsAPI.download(this.props.documentId).then((payload) => {
            this.setState({
                file: payload.data,
            });
        });
    };

    render() {
        return (
            isEmpty(this.props.documentDetails) || !this.state.file ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <PdfViewer
                        file={this.state.file}
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
