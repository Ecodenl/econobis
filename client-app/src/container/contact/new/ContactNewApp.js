import React from 'react';

import ContactNewToolbar from './ContactNewToolbar';
import ContactNewForm from './ContactNewForm';

const ContactNewApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <ContactNewToolbar />
                </div>

                <div className="col-md-12 margin-10-top">
                    <ContactNewForm type={props.params.type} />
                </div>
            </div>
        </div>
    );
};

export default ContactNewApp;
