import React from 'react';

import ContactDetailsFormConclusionView from './ContactDetailsFormConclusionView';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from '../../../components/panel/PanelHeader';

const ContactDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <ContactDetailsFormConclusionView />
            </PanelBody>
        </Panel>
    );
};

export default ContactDetailsFormConclusion;