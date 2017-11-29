import React from 'react';

import ContactDetailsToolbar from './ContactDetailsToolbar';
import ContactDetailsForm from './ContactDetailsForm';
import ContactDetailsHarmonica from './ContactDetailsHarmonica';
import Panel from "../../components/panel/Panel";
import PanelBody from "../../components/panel/PanelBody";

const ContactDetailsApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <ContactDetailsToolbar />
                </div>

                <div className="col-md-12">
                    <ContactDetailsForm id={props.params.id} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <ContactDetailsHarmonica id={props.params.id} />
                    </div>
                </div>
            </div>
            <Panel className="col-md-3">
                <PanelBody>
                    <ContactDetailsHarmonica />
                </PanelBody>
            </Panel>
        </div>
    )
};

export default ContactDetailsApp;
