import React, {Component} from 'react';

import ContactDetailsGroupsList from './ContactDetailsGroupsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsGroups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Campagnes</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsGroupsList/>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}


export default ContactDetailsGroups;