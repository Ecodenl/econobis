import React from 'react';

import ContactNewFormGeneral from './ContactNewFormGeneral';
import Panel from '../../components/panel/Panel';
import PanelHeader from '../../components/panel/PanelHeader';

const ContactNewForm = () => {
    return (
        <div>
            <ContactNewFormGeneral />
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Adres gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Telefoon gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Email gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Overige gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opmerkingen</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Afsluiting gegevens</span>
                </PanelHeader>
            </Panel>
        </div>
    );
};

export default ContactNewForm;
