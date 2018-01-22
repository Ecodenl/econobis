import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';
import DocumentTemplateDetailsToolbar from './DocumentTemplateDetailsToolbar';
import DocumentTemplateDetailsForm from './DocumentTemplateDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class DocumentTemplateDetailsApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchDocumentTemplate(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 extra-space-above">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                < DocumentTemplateDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <DocumentTemplateDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        documentTemplateDetails: state.documentTemplateDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplate: (id) => {
        dispatch(fetchDocumentTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTemplateDetailsApp);
