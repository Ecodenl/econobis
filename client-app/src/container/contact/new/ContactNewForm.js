import React from 'react';

import ContactNewFormGeneral from './ContactNewFormGeneral';

const ContactNewForm = props => {
    return (
        <div>
            <ContactNewFormGeneral type={props.type} organisationId={props.organisationId} />
        </div>
    );
};

export default ContactNewForm;
