import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import EmailsInList from './EmailsInList';
import EmailsInListToolbar from './EmailsInListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class EmailsInListApp extends Component {
    constructor(props) {
        super(props);

        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        this.props.fetchEmails();
    };

    componentWillUnmount() {
        this.props.clearEmails();
    };

    refreshData() {
        this.props.clearEmails();
        this.props.fetchEmails();
    };

    render() {
        return (
                <Panel className="col-md-9">
                    <PanelBody>
                        <div className="col-md-12 extra-space-above">
                            <EmailsInListToolbar
                                refreshData={this.refreshData}
                            />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <EmailsInList />
                        </div>
                    </PanelBody>
                </Panel>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    fetchEmails: () => {
        dispatch(fetchEmails());
    },
    clearEmails: () => {
        dispatch(clearEmails());
    },
});

export default connect(null, mapDispatchToProps)(EmailsInListApp);