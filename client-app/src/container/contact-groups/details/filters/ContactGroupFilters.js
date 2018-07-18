import React, {Component} from 'react';

import ContactGroupFiltersList from './ContactGroupFiltersList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactGroupFilters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Filters</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactGroupFiltersList/>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}


export default ContactGroupFilters;