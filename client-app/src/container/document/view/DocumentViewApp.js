import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchDocumentDetails } from '../../../actions/document/DocumentDetailsActions';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DocumentViewToolbar from "./DocumentViewToolbar";
import DocumentViewForm from "./DocumentViewForm";


class DocumentViewApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchDocumentDetails(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                <DocumentViewToolbar/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <DocumentViewForm
                            documentId={this.props.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentDetails: (id) => {
        dispatch(fetchDocumentDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewApp);
