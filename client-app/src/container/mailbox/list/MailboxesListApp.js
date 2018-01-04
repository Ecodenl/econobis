import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMailboxes, clearMailboxes } from '../../../actions/mailbox/MailboxesActions';
import MailboxesList from './MailboxesList';
import MailboxesListToolbar from './MailboxesListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class MailboxesListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMailboxes();
    };

    componentWillUnmount() {
        this.props.clearMailboxes();
    };

    refreshData = () => {
        this.props.clearMailboxes();
        this.props.fetchMailboxes();
    };

    render() {
        return (
                <Panel className="col-md-9">
                    <PanelBody>
                        <div className="col-md-12 extra-space-above">
                            <MailboxesListToolbar
                                refreshContactsData={() => this.refreshData()}
                            />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <MailboxesList />
                        </div>
                    </PanelBody>
                </Panel>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    fetchMailboxes: () => {
        dispatch(fetchMailboxes());
    },
    clearMailboxes: () => {
        dispatch(clearMailboxes());
    },
});

export default connect(null, mapDispatchToProps)(MailboxesListApp);