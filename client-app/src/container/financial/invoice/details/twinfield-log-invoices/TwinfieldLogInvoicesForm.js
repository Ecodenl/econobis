import React, { Component } from 'react';

import TwinfieldLogInvoicesFormList from './TwinfieldLogInvoicesFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

class TwinfieldLogInvoicesForm extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Twinfield log nota's</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <TwinfieldLogInvoicesFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default TwinfieldLogInvoicesForm;
