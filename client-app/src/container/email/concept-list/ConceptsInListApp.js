import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import { setEmailsPagination } from '../../../actions/email/EmailsPaginationActions';
import ConceptsInList from './ConceptsInList';
import ConceptsInListToolbar from './ConceptsInListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import filterHelper from '../../../helpers/FilterHelper';

class ConceptsInListApp extends Component {
    constructor(props) {
        super(props);

        this.refreshData = this.refreshData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchEmailsData();
    }

    componentWillUnmount() {
        this.props.clearEmails();
    }

    fetchEmailsData() {
        setTimeout(() => {
            const pagination = { limit: 20, offset: this.props.emailsPagination.offset };
            const filters = {};
            const sorts = {};
            this.props.fetchEmails('concept', filters, sorts, pagination);
        }, 100);
    }

    refreshData() {
        this.props.clearEmails();
        this.fetchEmailsData();
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setEmailsPagination({ page, offset });

        this.fetchEmailsData();
    }

    render() {
        return (
            <Panel className="col-md-9">
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ConceptsInListToolbar refreshData={this.refreshData} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ConceptsInList handlePageClick={this.handlePageClick} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailsPagination: state.emails.pagination,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchEmails: (folder, filters, sorts, pagination) => {
        dispatch(fetchEmails(folder, filters, sorts, pagination));
    },
    clearEmails: () => {
        dispatch(clearEmails());
    },
    setEmailsPagination: pagination => {
        dispatch(setEmailsPagination(pagination));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConceptsInListApp);
