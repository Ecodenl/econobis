import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';
import DocumentTemplateDetailsToolbar from './DocumentTemplateDetailsToolbar';
import DocumentTemplateDetailsForm from './DocumentTemplateDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class DocumentTemplateDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDocumentTemplate(this.props.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.fetchDocumentTemplate(nextProps.params.id);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <DocumentTemplateDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <DocumentTemplateDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentTemplateDetails: state.documentTemplateDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplate: id => {
        dispatch(fetchDocumentTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTemplateDetailsApp);
