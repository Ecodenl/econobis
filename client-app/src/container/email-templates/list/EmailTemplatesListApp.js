import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmailTemplates, clearEmailTemplates } from '../../../actions/email-templates/EmailTemplatesActions';
import EmailTemplatesList from './EmailTemplatesList';
import EmailTemplatesListToolbar from './EmailTemplatesListToolbar';

// Functionele wrapper voor de class component
const EmailTemplatesListAppWrapper = props => {
    return <EmailTemplatesListApp {...props} />;
};

class EmailTemplatesListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEmailTemplates();
    }

    // niet echt nodig
    // componentWillUnmount() {
    //     this.props.clearEmailTemplates();
    // }

    refreshEmailTemplatesData = () => {
        this.props.clearEmailTemplates();
        this.props.fetchEmailTemplates();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <EmailTemplatesListToolbar
                                refreshEmailTemplatesData={() => this.refreshEmailTemplatesData()}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <EmailTemplatesList emailTemplates={this.props.emailTemplates} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailTemplates: state.emailTemplates,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmailTemplates: () => {
        dispatch(fetchEmailTemplates());
    },
    clearEmailTemplates: () => {
        dispatch(clearEmailTemplates());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesListAppWrapper);
