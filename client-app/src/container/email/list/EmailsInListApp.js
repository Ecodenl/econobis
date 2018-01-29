import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import { setEmailsPagination } from '../../../actions/email/EmailsPaginationActions';
import EmailsInList from './EmailsInList';
import EmailsInListToolbar from './EmailsInListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";
import { isEmpty } from 'lodash';

class EmailsInListApp extends Component {
    constructor(props) {
        super(props);

        this.refreshData = this.refreshData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchEmailsData();
    };

    componentWillUnmount() {
        this.props.clearEmails();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.folder !== nextProps.params.folder) {
            if (!isEmpty(nextProps.params.folder)) {
                this.props.setEmailsPagination({page: 0, offset: 0});
                this.props.clearEmails();
                this.props.fetchEmailsData;
                }
            }
        }

    fetchEmailsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.emailsPagination.offset };

            this.props.fetchEmails(this.props.params.folder, pagination);
        },100 );
    };

    refreshData() {
        this.props.clearEmails();
        this.fetchEmailsData();
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setEmailsPagination({page, offset});

        this.fetchEmailsData();
    };

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
                            <EmailsInList handlePageClick={this.handlePageClick}/>
                        </div>
                    </PanelBody>
                </Panel>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        emailsPagination: state.emails.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmails: (folder, pagination) => {
        dispatch(fetchEmails(folder, pagination));
    },
    clearEmails: () => {
        dispatch(clearEmails());
    },
    setEmailsPagination: (pagination) => {
        dispatch(setEmailsPagination(pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailsInListApp);