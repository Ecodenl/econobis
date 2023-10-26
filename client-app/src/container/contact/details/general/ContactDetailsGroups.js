import React, { Component } from 'react';

import ContactDetailsGroupsList from './ContactDetailsGroupsList';
import ViewText from "../../../../components/form/ViewText";

class ContactDetailsGroups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ViewText
                    className={'h5'}
                    label={'Groepen'}
                    labelSize={'col-sm-10'}
                    valueSize={'col-sm-2'}
                    textToolTip={'Hier staat een opsomming van alle groepen waaraan het contact aan deelneemt, die het schuifje “zichtbaar bij contact” aan hebben staan. Ga naar de betreffende groep om het het schuifje wel of niet aan te zetten.'}
                />

                <div className="col-md-12">
                    <ContactDetailsGroupsList />
                </div>
            </div>
        );
    }
}

export default ContactDetailsGroups;
