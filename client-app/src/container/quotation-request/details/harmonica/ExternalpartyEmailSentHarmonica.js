import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ExternalpartyEmailsSentList from "./ExternalpartyEmailsSentList";

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const ExternalpartyEmailSentHarmonica = ({ toggleShowList, showEmailsSentList, newEmail, emailSentCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} className="">
                        E-MAIL EXTERNE PARTIJ <span className="badge">{emailSentCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={newEmail}>
                        <Icon className="harmonica-button" size={14} icon={plus} />
                    </a>
                </div>
                <div className="col-sm-12">{showEmailsSentList && <ExternalpartyEmailsSentList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default ExternalpartyEmailSentHarmonica;
