import React from 'react';

import ContactImportForm from './ContactImportForm';
import ContactImportToolbar from './ContactImportToolbar';

const ContactImportApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <ContactImportToolbar />
                </div>

                <div className="col-md-12 margin-10-top">
                    <ContactImportForm />
                </div>
            </div>
        </div>
    );
};

export default ContactImportApp;
