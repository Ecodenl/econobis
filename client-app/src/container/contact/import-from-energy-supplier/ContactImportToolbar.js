import React, { Component } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class ContactImportToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-4" />
                            <div className="col-md-4">
                                <h4 className="text-center text-success margin-small">
                                    <strong>{'Importeer energieklanten'}</strong>
                                </h4>
                            </div>
                            <div className="col-md-4" />
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default ContactImportToolbar;
