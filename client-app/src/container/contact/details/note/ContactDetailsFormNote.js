import React, { Component } from 'react';

import ContactDetailsFormNoteList from './ContactDetailsFormNoteList';
import ContactDetailsFormNoteNew from './ContactDetailsFormNoteNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Parkeerplaats</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormNoteList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <ContactDetailsFormNoteNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ContactDetailsFormNote;
