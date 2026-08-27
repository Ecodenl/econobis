import React from 'react';
import { useParams } from 'react-router-dom';

import ContactNewToolbar from './ContactNewToolbar';
import ContactNewForm from './ContactNewForm';

const ContactNewApp = props => {
    const params = useParams();
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <ContactNewToolbar />
                </div>

                <div className="col-md-12 margin-10-top">
                    <ContactNewForm type={params.type} />
                </div>
            </div>
        </div>
    );
};

export default ContactNewApp;
