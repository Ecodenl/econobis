import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import EmailList from './EmailsList';

const EmailHarmonica = ({ toggleShowList, showEmailsList, newEmail, emailCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} role="button" className="">
                        E-MAIL VERZONDEN <span className="badge">{emailCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={newEmail}>
                        <span className="glyphicon glyphicon-plus glyphicon-white" />
                    </a>
                </div>
                <div className="col-sm-12">{showEmailsList && <EmailList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default EmailHarmonica;
