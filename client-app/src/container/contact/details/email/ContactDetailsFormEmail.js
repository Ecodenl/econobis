import React, { Component} from 'react';

import ContactDetailsFormEmailList from './ContactDetailsFormEmailList';
import ContactDetailsFormEmailNew from './ContactDetailsFormEmailNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">E-mail gegevens</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormEmailList />
                    </div>
                    <div className="col-md-12 extra-space-above">
                        { this.state.showNew && <ContactDetailsFormEmailNew toggleShowNew={this.toggleShowNew} /> }
                    </div>
                </PanelBody>
            </Panel>

        );
    }
};

export default ContactDetailsFormEmail;