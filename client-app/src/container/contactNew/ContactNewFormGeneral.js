import React from 'react';

import ContactNewFormPersonal from './ContactNewFormPersonal';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

const ContactNewFormGeneral = () => {
    return (
        <Panel className={"panel-grey"}>
            <PanelBody>
                <div className="col-md-12">
                    <ContactNewFormPersonal/>
                </div>
            </PanelBody>
        </Panel>
    );
};


export default ContactNewFormGeneral;