import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmailDetailsToolbar from './EmailDetailsToolbar';
import EmailDetailsForm from './EmailDetailsForm';
import EmailDetailsAttachments from "./attachments/EmailDetailsAttachments";

import { fetchEmail, clearEmail } from '../../../actions/email/EmailDetailsActions';

class EmailDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchEmail(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearEmail();
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <EmailDetailsToolbar/>
                    </div>

                    <div className="col-md-12">
                        <EmailDetailsForm/>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    fetchEmail: (id) => {
        dispatch(fetchEmail(id));
    },
    clearEmail: () => {
        dispatch(clearEmail());
    },
});

export default connect(null, mapDispatchToProps)(EmailDetailsApp);