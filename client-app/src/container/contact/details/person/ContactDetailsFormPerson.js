import React, { Component} from 'react';

import ContactDetailsFormPersonList from './ContactDetailsFormPersonList';
import ContactDetailsFormPersonNew from './ContactDetailsFormPersonNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsFormPerson extends Component {
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
                    <span className="h5 text-bold">Contactpersonen</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}><span className="glyphicon glyphicon-plus"/></a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsFormPersonList />
                    </div>
                    <div className="col-md-12 extra-space-above">
                        { this.state.showNew && <ContactDetailsFormPersonNew toggleShowNew={this.toggleShowNew} /> }
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

export default ContactDetailsFormPerson;
