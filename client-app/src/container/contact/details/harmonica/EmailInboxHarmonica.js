import React from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import EmailInboxList from './EmailInboxList';

const EmailInboxHarmonica = ({toggleShowList, showEmailsInboxList, toggleAddEmail, emailInboxCount}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-12">
                    <span onClick={toggleShowList} className="">E-MAIL INBOX <span className="badge">{ emailInboxCount }</span></span>
                    <a role="button" className="pull-right" onClick={toggleAddEmail}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    { showEmailsInboxList && <EmailInboxList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

export default EmailInboxHarmonica;