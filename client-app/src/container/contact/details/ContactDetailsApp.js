import React from 'react';
import { useParams } from 'react-router-dom';

import ContactDetailsToolbar from './ContactDetailsToolbar';
import ContactDetailsForm from './ContactDetailsForm';
import ContactDetailsHarmonica from './ContactDetailsHarmonica';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const ContactDetailsApp = () => {
    const params = useParams();

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <ContactDetailsToolbar />
                </div>

                <div className="col-md-12">
                    <ContactDetailsForm id={params.id} />
                </div>
            </div>
            <Panel className="col-md-3 harmonica">
                <PanelBody>
                    <ContactDetailsHarmonica id={params.id} />
                </PanelBody>
            </Panel>
        </div>
    );
};

export default ContactDetailsApp;
