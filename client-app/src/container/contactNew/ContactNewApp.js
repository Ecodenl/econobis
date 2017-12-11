import React from 'react';

import ContactNewToolbar from './ContactNewToolbar';
import ContactNewForm from './ContactNewForm';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

const ContactNewApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 extra-space-above">
                    <ContactNewToolbar />
                </div>

                <div className="col-md-12 extra-space-above">
                    <ContactNewForm type={props.params.type} organisationId={props.params.id}/>
                </div>
            </div>
            <Panel className="col-md-3">
                <PanelBody>
                    <div className="col-md-12 extra-space-above">
                        Buttons met openstaande items, zoals email, taken, etc.
                    </div>

                    <div className="col-md-12 extra-space-above">
                        <div className="panel panel-default harmonica-button">
                            <div className="panel-body">
                                <p className="text-center">AANMELDINGEN <span className="badge">0</span></p>
                            </div>
                        </div>
                        <div className="panel panel-default harmonica-button">
                            <div className="panel-body">
                                <p className="text-center">KANSEN <span className="badge">0</span></p>
                            </div>
                        </div>
                        <div className="panel panel-default harmonica-button">
                            <div className="panel-body">
                                <p className="text-center">TAKEN <span className="badge">0</span></p>
                            </div>
                        </div>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    )
};

export default ContactNewApp;