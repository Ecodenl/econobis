import React from 'react';

import ContactNewFormGeneral from './ContactNewFormGeneral';
import Panel from '../../components/panel/Panel';
import PanelHeader from '../../components/panel/PanelHeader';

const ContactNewForm = props => {
    return (
        <div>
            <ContactNewFormGeneral type={props.type} accountId={props.accountId}/>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Adres gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Email gegevens</span>
                </PanelHeader>
            </Panel>
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Telefoon gegevens</span>
                </PanelHeader>
            </Panel>
            {props.type === 'bedrijf' &&
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Contacten</span>
                </PanelHeader>
            </Panel>
            }
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
