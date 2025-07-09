import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDocumentDetails } from '../../../actions/document/DocumentDetailsActions';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentViewToolbar from './DocumentViewToolbar';
import DocumentViewForm from './DocumentViewForm';
import DocumentDetailsAPI from '../../../api/document/DocumentDetailsAPI';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const DocumentViewAppWrapper = props => {
    const params = useParams();
    return <DocumentViewApp {...props} params={params} />;
};

class DocumentViewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: 1,
        };

        this.download = this.download.bind(this);
    }

    componentDidMount() {
        this.props.fetchDocumentDetails(this.props.params.id);
    }

    zoomIn = () => {
        this.setState({
            scale: this.state.scale + 0.2,
        });
    };

    zoomOut = () => {
        this.setState({
            scale: this.state.scale - 0.2,
        });
    };

    download() {
        DocumentDetailsAPI.download(this.props.documentDetails.id).then(payload => {
            fileDownload(payload.data, this.props.documentDetails.filename);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <DocumentViewToolbar
                                    zoomIn={this.zoomIn}
                                    zoomOut={this.zoomOut}
                                    download={this.download}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <DocumentViewForm documentId={this.props.params.id} scale={this.state.scale} />
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewAppWrapper);
