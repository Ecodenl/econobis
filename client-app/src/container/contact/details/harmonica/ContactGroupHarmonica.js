import React from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactGroupsList from './ContactGroupsList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

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
                        <Icon class="harmonica-button" size={14} icon={plus} />
                    </a>
                </div>
                <div className="col-sm-12">{showContactGroupsList && <ContactGroupsList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default ContactGroupHarmonica;
