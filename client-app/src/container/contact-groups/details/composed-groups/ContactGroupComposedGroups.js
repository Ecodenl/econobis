import React, {Component} from 'react';

import ContactGroupComposedGroupsList from './ContactGroupComposedGroupsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactGroupComposedGroups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Samengesteld uit</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactGroupComposedGroupsList/>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}


export default ContactGroupComposedGroups;