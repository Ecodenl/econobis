import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import EmailInboxList from './EmailsInboxList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';
import {hashHistory} from "react-router";
import {search} from 'react-icons-kit/fa/search';

const EmailInboxHarmonica = ({ toggleShowList, showEmailsInboxList, newEmail, emailInboxCount, contactId }) => {

    const goToMailSearch = () => {
        hashHistory.push(`/mailclient/inbox?contact=${contactId}`);
    }

    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} role="button" className="">
                        E-MAIL INBOX <span className="badge">{emailInboxCount}</span>
                        <a role="button" onClick={goToMailSearch} style={{marginLeft: '5px'}}>
                            <Icon className="harmonica-button" size={14} icon={search}/>
                        </a>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={newEmail}>
                        <Icon className="harmonica-button" size={14} icon={plus} />
                    </a>
                </div>
                <div className="col-sm-12">{showEmailsInboxList && <EmailInboxList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default EmailInboxHarmonica;
