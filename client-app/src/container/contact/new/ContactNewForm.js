import React from 'react';

import ContactNewFormGeneral from './ContactNewFormGeneral';
import Panel from '../../../components/panel/Panel';
import PanelHeader from '../../../components/panel/PanelHeader';

const ContactNewForm = props => {
    return (
        <div>
            <ContactNewFormGeneral type={props.type} organisationId={props.organisationId}/>
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
            {props.type === 'Organisatie' &&
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Organisaties</span>
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
