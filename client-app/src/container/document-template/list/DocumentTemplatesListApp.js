import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    fetchDocumentTemplates,
    clearDocumentTemplates,
} from '../../../actions/document-templates/DocumentTemplatesActions';
import DocumentTemplatesList from './DocumentTemplatesList';
import DocumentTemplatesListToolbar from './DocumentTemplatesListToolbar';

// Functionele wrapper voor de class component
const DocumentTemplatesListAppWrapper = props => {
    return <DocumentTemplatesListApp {...props} />;
};

class DocumentTemplatesListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDocumentTemplates();
    }

    componentWillUnmount() {
        this.props.clearDocumentTemplates();
    }

    refreshDocumentTemplatesData = () => {
        this.props.clearDocumentTemplates();
        this.props.fetchDocumentTemplates();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <DocumentTemplatesListToolbar
                                refreshDocumentTemplatesData={() => this.refreshDocumentTemplatesData()}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <DocumentTemplatesList
                                documentTemplates={this.props.documentTemplates}
                                refreshDocumentTemplatesData={this.refreshDocumentTemplatesData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentTemplates: state.documentTemplates,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplates: () => {
        dispatch(fetchDocumentTemplates());
    },
    clearDocumentTemplates: () => {
        dispatch(clearDocumentTemplates());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTemplatesListAppWrapper);
