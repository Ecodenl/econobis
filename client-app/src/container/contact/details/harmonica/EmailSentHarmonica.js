import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import EmailSentList from './EmailsSentList';
import {hashHistory} from "react-router";
import Icon from 'react-icons-kit';
import {plus} from 'react-icons-kit/fa/plus';
import {search} from 'react-icons-kit/fa/search';

const EmailSentHarmonica = ({toggleShowList, showEmailsSentList, newEmail, emailSentCount, contactId}) => {

    const goToMailSearch = () => {
        hashHistory.push(`/mailclient/sent?contact=${contactId}`);
    }

    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} className="">
                        E-MAIL VERZONDEN <span className="badge">{emailSentCount}</span>
                        <a role="button" onClick={goToMailSearch} style={{marginLeft: '5px'}}>
                            <Icon className="harmonica-button" size={14} icon={search}/>
                        </a>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={newEmail}>
                        <Icon className="harmonica-button" size={14} icon={plus}/>
                    </a>
                </div>
                <div className="col-sm-12">{showEmailsSentList && <EmailSentList/>}</div>
            </PanelBody>
        </Panel>
    );
};

export default EmailSentHarmonica;
