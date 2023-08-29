import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import FreeFieldsList from './FreeFieldsList';

class FreeFieldsListApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <FreeFieldsList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default FreeFieldsListApp;
