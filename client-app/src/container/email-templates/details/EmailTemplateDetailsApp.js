import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmailTemplate } from '../../../actions/email-templates/EmailTemplateDetailsActions';
import EmailTemplateDetailsToolbar from './EmailTemplateDetailsToolbar';
import EmailTemplateDetailsForm from './EmailTemplateDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const EmailTemplateDetailsAppWrapper = props => {
    const params = useParams();
    return <EmailTemplateDetailsApp {...props} params={params} />;
};

class EmailTemplateDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEmailTemplate(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <EmailTemplateDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <EmailTemplateDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailTemplateDetails: state.emailTemplateDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmailTemplate: id => {
        dispatch(fetchEmailTemplate(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetailsAppWrapper);
