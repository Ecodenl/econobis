import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactGroupsList from './ContactGroupsList';

const ContactGroupHarmonica = ({ toggleShowList, showContactGroupsList, toggleAddGroup, groupCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span onClick={toggleShowList} className="">
                        STATISCHE GROEPEN <span className="badge">{groupCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    <a role="button" className="pull-right" onClick={toggleAddGroup}>
                        <span className="glyphicon glyphicon-plus glyphicon-white" />
                    </a>
                </div>
                <div className="col-sm-12">{showContactGroupsList && <ContactGroupsList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default ContactGroupHarmonica;
