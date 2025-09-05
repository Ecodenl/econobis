import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import { setEmailsPagination } from '../../../actions/email/EmailsPaginationActions';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import { clearFilterEmail } from '../../../actions/email/EmailFiltersActions';
import { setFilterMe } from '../../../actions/email/EmailFiltersActions';
import { setError } from '../../../actions/general/ErrorActions';
import EmailsInList from './EmailsInList';
import EmailsInListToolbar from './EmailsInListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { isEmpty } from 'lodash';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import filterHelper from '../../../helpers/FilterHelper';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const EmailsInListAppWrapper = props => {
    const params = useParams();
    return <EmailsInListApp {...props} params={params} />;
};

class EmailsInListApp extends Component {
    constructor(props) {
        super(props);

        if (!isEmpty(props.params)) {
            // todo WM: volgens mij wordt mailclient/email/eigen niet meer gebruikt en kan dit weg (voor nu nog even laten staan)
            if (props.params.type === 'eigen') {
                this.props.setFilterMe(true);
            }
        } else {
            this.props.resetEmailsFilters();
        }

        this.refreshData = this.refreshData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchEmailsData();
    }

    componentWillUnmount() {
        this.props.clearEmails();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.params.folder !== nextProps.params.folder) {
            if (!isEmpty(nextProps.params.folder)) {
                this.props.clearFilterEmail();
                this.props.setEmailsPagination({ page: 0, offset: 0 });
                this.props.clearEmails();
                this.fetchEmailsData();
            }
        }

        if (this.props.params.type !== nextProps.params.type) {
            if (!isEmpty(nextProps.params)) {
                // todo WM: volgens mij wordt mailclient/email/eigen niet meer gebruikt en kan dit weg (voor nu nog even laten staan)
                if (nextProps.params.type === 'eigen') {
                    this.props.setFilterMe(true);
                } else {
                    this.props.clearFilterEmail();
                }
            }

            setTimeout(() => {
                this.props.setEmailsPagination({ page: 0, offset: 0 });
                this.props.clearEmails();
                this.fetchEmailsData();
            }, 100);
        }
    }

    resetEmailsFilters() {
        this.props.clearFilterEmail();

        this.fetchEmailsData();
    }

    onSubmitFilter() {
        this.props.clearEmails();

        this.props.setEmailsPagination({ page: 0, offset: 0 });

        this.fetchEmailsData();
    }

    fetchEmailsData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.emailsFilters);
            const sorts = this.props.emailsSorts;
            const pagination = { limit: 20, offset: this.props.emailsPagination.offset };

            this.props.fetchEmails(this.props.params.folder, filters, sorts, pagination);
        }, 100);
    }

    refreshData() {
        this.props.blockUI();
        MailboxAPI.receiveMailFromMailboxesUser()
            .then(payload => {
                const pagination = { limit: 20, offset: 0 };

                this.props.clearEmails();
                this.resetEmailsFilters();
                this.props.fetchEmails(this.props.params.folder, pagination);
                this.props.unblockUI();
            })
            .catch(error => {
                console.log(error);
                this.props.setError(error.response.status, error.response.data.message);
                this.props.unblockUI();
            });
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setEmailsPagination({ page, offset });

        this.fetchEmailsData();
    }

    render() {
        let folder = 'ontvangen';

        if (this.props.params.folder == 'removed') {
            folder = 'verwijderd';
        } else if (this.props.params.folder == 'sent') {
            folder = 'verzonden';
        }

        let me = false;

        // todo WM: volgens mij wordt mailclient/email/eigen niet meer gebruikt en kan dit weg (voor nu nog even laten staan)
        if (this.props.params.type == 'eigen') {
            me = true;
        }

        return (
            <Panel className="col-lg-12">
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <EmailsInListToolbar refreshData={this.refreshData} folder={folder} me={me} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <EmailsInList
                            folder={folder}
                            handlePageClick={this.handlePageClick}
                            emails={this.props.emails}
                            emailsPagination={this.props.emailsPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            fetchEmailsData={() => this.fetchEmailsData()}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        emails: state.emails.list,
        emailsPagination: state.emails.pagination,
        emailsFilters: state.emails.filters,
        emailsSorts: state.emails.sorts,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchEmails, clearEmails, clearFilterEmail, setEmailsPagination, blockUI, unblockUI, setFilterMe, setError },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsInListAppWrapper);
