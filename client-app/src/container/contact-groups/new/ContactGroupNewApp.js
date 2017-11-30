import React from 'react';

import ContactGroupNewForm from './ContactGroupNewForm';
import ContactGroupNewToolbar from './ContactGroupNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const ContactGroupNewApp = () => {
    return (
        <div className="row">
            <div className="col-md-9">
                <Panel>
                    <PanelBody>
                        <div className="col-md-12 extra-space-above">
                            <ContactGroupNewToolbar />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <Panel>
                                <PanelBody>
                                    <ContactGroupNewForm />
                                </PanelBody>
                            </Panel>
                        </div>
                    </PanelBody>
                </Panel>
            </div>
            <div className="col-md-3" />
        </div>
    )
};

export default ContactGroupNewApp;