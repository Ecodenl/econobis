import React, { Component } from 'react';

import ContactDetailsFormOccupationsList from './ContactDetailsFormOccupationsList';
import ContactDetailsFormOccupationsNew from './ContactDetailsFormOccupationsNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import ContactsAPI from '../../../../api/contact/ContactsAPI';

class ContactDetailsFormOccupations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            contacts: [],
            peekLoading: {
                contacts: true,
            },
        };
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });
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
                    <span className="h5 text-bold">Verbindingen</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormOccupationsList
                            contacts={this.state.contacts}
                            peekLoading={this.state.peekLoading}
                        />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <ContactDetailsFormOccupationsNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ContactDetailsFormOccupations;
