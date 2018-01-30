import React from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import EmailSentList from './EmailsSentList';

const EmailSentHarmonica = ({toggleShowList, showEmailsSentList, newEmail, emailSentCount}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-11" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} className="">E-MAIL VERZONDEN <span className="badge">{ emailSentCount }</span></span>
                </div>
                <div className={"col-sm-1"}>
                    <a role="button" className="pull-right" onClick={newEmail}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                </div>
                <div className="col-sm-12">
                    { showEmailsSentList && <EmailSentList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

export default EmailSentHarmonica;