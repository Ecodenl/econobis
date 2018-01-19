import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchDocumentDetails } from '../../../actions/document/DocumentDetailsActions';
import DocumentDetailsToolbar from './DocumentDetailsToolbar';
import DocumentDetailsForm from './DocumentDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class DocumentDetailsApp extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchDocumentDetails(this.props.params.id);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 extra-space-above">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                <DocumentDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <DocumentDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        emailTemplateDetails: state.emailTemplateDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDocumentDetails: (id) => {
        dispatch(fetchDocumentDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsApp);
