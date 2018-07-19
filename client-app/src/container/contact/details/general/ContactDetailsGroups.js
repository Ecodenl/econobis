import React, {Component} from 'react';

import ContactDetailsGroupsList from './ContactDetailsGroupsList';

class ContactDetailsGroups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div>
                    <span className="h5 text-bold">Groepen</span>

                    <div className="col-md-12">
                        <ContactDetailsGroupsList/>
                    </div>
           </div>
        );
    }
}


export default ContactDetailsGroups;