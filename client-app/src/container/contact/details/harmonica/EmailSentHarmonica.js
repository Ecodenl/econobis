import React from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import EmailSentList from './EmailSentList';

const EmailSentHarmonica = ({toggleShowList, showEmailsSentList, toggleAddEmail, emailSentCount}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-12">
                    <span onClick={toggleShowList} className="">E-MAIL VERZONDEN <span className="badge">{ emailSentCount }</span></span>
                    <a role="button" className="pull-right" onClick={toggleAddEmail}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    { showEmailsSentList && <EmailSentList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

export default EmailSentHarmonica;