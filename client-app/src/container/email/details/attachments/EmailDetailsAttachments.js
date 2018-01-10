import React, { Component } from 'react';

import EmailDetailsAttachmentsList from './EmailDetailsAttachmentsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

    class EmailDetailsAttachments extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Bijlagen</span>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <EmailDetailsAttachmentsList/>
                        </div>
                    </PanelBody>
                </Panel>
            );
        }
    }



export default EmailDetailsAttachments;