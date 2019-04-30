import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import EmailInboxList from './EmailsInboxList';

const EmailInboxHarmonica = ({ toggleShowList, showEmailsInboxList, newEmail, emailInboxCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} role="button" className="">
                        E-MAIL INBOX <span className="badge">{emailInboxCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={newEmail}>
                        <span className="glyphicon glyphicon-plus glyphicon-white" />
                    </a>
                </div>
                <div className="col-sm-12">{showEmailsInboxList && <EmailInboxList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default EmailInboxHarmonica;
