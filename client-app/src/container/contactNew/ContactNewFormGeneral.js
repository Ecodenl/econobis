import React from 'react';

import ContactNewFormPersonal from './ContactNewFormPersonal';
import ContactNewFormAccount from './ContactNewFormAccount';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

const ContactNewFormGeneral = props => {
    return (
        <Panel className={"panel-grey"}>
            <PanelBody>
                <div className="col-md-12">
                    { props.type === 'persoon' && <ContactNewFormPersonal /> }
                    { props.type === 'bedrijf' && <ContactNewFormAccount /> }
                </div>
            </PanelBody>
        </Panel>
    );
};


export default ContactNewFormGeneral;