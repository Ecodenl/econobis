import React from 'react';

import ContactDetailsToolbar from './ContactDetailsToolbar';
import ContactDetailsForm from './ContactDetailsForm';
import ContactDetailsHarmonica from './ContactDetailsHarmonica';

const ContactDetailsApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <ContactDetailsToolbar />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <ContactDetailsForm id={props.params.id} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <ContactDetailsHarmonica id={props.params.id} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactDetailsApp;