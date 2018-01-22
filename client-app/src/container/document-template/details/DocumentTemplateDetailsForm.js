import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchDocumentTemplate } from '../../../actions/document-templates/DocumentTemplateDetailsActions';
import DocumentTemplateFormGeneral from './general/DocumentTemplateFormGeneral';


class DocumentTemplateDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.documentTemplate) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <DocumentTemplateFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        documentTemplate: state.documentTemplate,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentTemplate: (id) => {
        dispatch(fetchDocumentTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTemplateDetailsForm);
