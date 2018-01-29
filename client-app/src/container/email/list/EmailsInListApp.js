import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import EmailsInList from './EmailsInList';
import EmailsInListToolbar from './EmailsInListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";
import { isEmpty } from 'lodash';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';

class EmailsInListApp extends Component {
    constructor(props) {
        super(props);

        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        this.props.fetchEmails(this.props.params.folder);
    };

    componentWillUnmount() {
        this.props.clearEmails();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.folder !== nextProps.params.folder) {
            if (!isEmpty(nextProps.params.folder)) {
                this.props.clearEmails();
                this.props.fetchEmails(nextProps.params.folder);
                }
            }
        }

    refreshData() {
        MailboxAPI.receiveMailFromMailboxesUser().then(payload => {
            this.props.clearEmails();
            this.props.fetchEmails(this.props.params.folder);
        });
    }

    render() {
        return (
                <Panel className="col-md-9">
                    <PanelBody>
                        <div className="col-md-12 margin-10-top">
                            <EmailsInListToolbar
                                refreshData={this.refreshData}
                                folder={this.props.params.folder == 'inbox' ? 'inbox' : 'verzonden'}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <EmailsInList />
                        </div>
                    </PanelBody>
                </Panel>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    fetchEmails: (folder) => {
        dispatch(fetchEmails(folder));
    },
    clearEmails: () => {
        dispatch(clearEmails());
    },
});

export default connect(null, mapDispatchToProps)(EmailsInListApp);