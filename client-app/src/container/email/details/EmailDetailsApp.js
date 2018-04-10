import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmailDetailsToolbar from './EmailDetailsToolbar';
import EmailDetailsForm from './EmailDetailsForm';
import EmailAPI from './../../../api/email/EmailAPI';

import { fetchEmail, clearEmail } from '../../../actions/email/EmailDetailsActions';
import {browserHistory} from "react-router";

class EmailDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.restoreEmail = this.restoreEmail.bind(this);
        this.removeEmail = this.removeEmail.bind(this);
    }

    componentDidMount() {
        this.props.fetchEmail(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearEmail();
    };

    refreshEmail(){
        this.props.clearEmail();
        this.props.fetchEmail(this.props.params.id);
    }

    restoreEmail() {
        //sent mails dont have an imapId
        if (this.props.email.imapId === null) {
            EmailAPI.moveToFolder(this.props.email.id, 'sent').then(() => {
                this.refreshEmail();
            });
        }
        else {
            EmailAPI.moveToFolder(this.props.email.id, 'inbox').then(() => {
                this.refreshEmail();
            });
        }
    }

    removeEmail() {
        if (this.props.email.folder === 'inbox' || this.props.email.folder === 'sent') {
            EmailAPI.moveToFolder(this.props.email.id, 'removed').then(() => {
                this.refreshEmail();
            });
        }
        else if (this.props.email.folder === 'removed') {
            EmailAPI.deleteEmail(this.props.email.id).then(() => {
                browserHistory.goBack();
            });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <EmailDetailsToolbar removeEmail={this.removeEmail} id={this.props.params.id}/>
                    </div>

                    <div className="col-md-12">
                        <EmailDetailsForm restoreEmail={this.restoreEmail}/>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailDetailsApp);