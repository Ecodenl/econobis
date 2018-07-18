import React, {Component} from 'react';

import ContactGroupExtraFiltersList from './ContactGroupExtraFiltersList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactGroupExtraFilters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Extra filters</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactGroupExtraFiltersList/>
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}


export default ContactGroupExtraFilters;