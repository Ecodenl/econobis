import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    fetchMailboxes,
    clearMailboxes,
} from '../../../actions/mailbox/MailboxesActions';
import MailboxesList from './MailboxesList';
import MailboxesListToolbar from './MailboxesListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { bindActionCreators } from 'redux';

class MailboxesListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMailboxes(1);
    }

    componentWillUnmount() {
        this.props.clearMailboxes();
    }

    refreshData = (selectedValue) => {
        this.props.clearMailboxes();
        this.props.fetchMailboxes(selectedValue);
    };

    render() {
        return (
            <Panel className="col-md-12">
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <MailboxesListToolbar refreshData={() => this.refreshData()}/>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <MailboxesList refreshData={this.refreshData} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailboxesFilters: state.mailboxes.filters,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearMailboxes,
            fetchMailboxes,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MailboxesListApp);
