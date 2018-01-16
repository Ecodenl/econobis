import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmails, clearEmails } from '../../../actions/email/EmailsActions';
import ConceptsInList from './ConceptsInList';
import ConceptsInListToolbar from './ConceptsInListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class ConceptsInListApp extends Component {
    constructor(props) {
        super(props);

        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        this.props.fetchEmails('concept');
    };

    componentWillUnmount() {
        this.props.clearEmails();
    };

    refreshData() {
        this.props.clearEmails();
        this.props.fetchEmails('concept');
    };

    render() {
        return (
                <Panel className="col-md-9">
                    <PanelBody>
                        <div className="col-md-12 extra-space-above">
                            <ConceptsInListToolbar
                                refreshData={this.refreshData}
                            />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <ConceptsInList />
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

export default connect(null, mapDispatchToProps)(ConceptsInListApp);