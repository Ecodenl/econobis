import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDocumentDetails } from '../../../actions/document/DocumentDetailsActions';
import DocumentDetailsToolbar from './DocumentDetailsToolbar';
import DocumentDetailsForm from './DocumentDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const DocumentDetailsAppWrapper = props => {
    const params = useParams();
    return <DocumentDetailsApp {...props} params={params} />;
};

class DocumentDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    componentDidMount() {
        this.props.fetchDocumentDetails(this.props.params.id);
    }

    download() {
        DocumentDetailsAPI.download(this.props.documentDetails.id).then(payload => {
            fileDownload(payload.data, this.props.documentDetails.filename);
        });
    }

    render() {
        const createdFrom = this.props.params.createdFrom ? this.props.params.createdFrom : 'document';
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <DocumentDetailsToolbar download={this.download} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <DocumentDetailsForm createdFrom={createdFrom} />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentDetails: id => {
        dispatch(fetchDocumentDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsAppWrapper);
