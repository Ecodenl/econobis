import React, {Component} from 'react';

import ContactDetailsCampaignsList from './ContactDetailsCampaignsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsCampaigns extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Campagnes</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <ContactDetailsCampaignsList/>
                        </div>
                    </PanelBody>
                </Panel>
            </Panel>
        );
    }
}


export default ContactDetailsCampaigns;